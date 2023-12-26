import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { LoginFormData, SignUpFormData } from '../interfaces/AuthTypes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiURL: string = '';

  constructor(private http: HttpClient) { }


  login(userLoginData: LoginFormData) : Observable<any>{
    return this.http.post<any>(this.apiURL, userLoginData);
  }

  signUp(userSignUpData: SignUpFormData): Observable<any> {
    return this.http.post<any>(this.apiURL, userSignUpData);
  }
}
