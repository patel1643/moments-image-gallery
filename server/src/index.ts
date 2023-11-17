import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit'
import session from 'express-session'
import helmet from 'helmet'
import expressSessionConfig from './config/express-session.config'
import { defaultLimiterConfig } from './config/limiter.config'
import passport from './middlewares/passport.middleware'

const nocache = require('nocache')

dotenv.config()

// Express
const app = express()
const port = process.env.PORT || 5000

// Redis
const redis = require('redis')
const connectRedis = require('connect-redis')
const redisStore = connectRedis(session)
export const redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    legacyMode: true,
})
redisClient.connect()

app.use(
    cors({
        origin: process.env.CLIENT_DOMAIN,
        credentials: true,
    }),
)
app.set('trust proxy', 1)
app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(bodyParser.json())
app.use(nocache())
app.use(cookieParser())
app.use(helmet())
app.use(
    session({
        store: new redisStore({
            client: redisClient,
        }),
        secret: expressSessionConfig.secret,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        unset: 'destroy',
        cookie: expressSessionConfig.cookie,
    }),
)

const limiter = rateLimit(defaultLimiterConfig)
app.use(limiter)

app.use(passport.session())
app.use(passport.initialize())

// Routes

app.listen(port, () => {
    console.log(`Server started and bound to port ${port} successfully...🚀`)
})
