import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginFormData } from '../../interfaces/AuthTypes';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService){}

  loginFormSubmit(): void{
    const loginFormData: LoginFormData = this.loginForm.value;
    this.authService.login(loginFormData).subscribe(resp => {
      console.log(resp);
    });
  }


  ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6)]),
        rememberMeCheckbox: new FormControl(null)
      });
  }
}
