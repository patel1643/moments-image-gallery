import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { SignUpFormData } from '../../interfaces/AuthTypes';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss'
})
export class SignUpFormComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
      this.signUpForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [ Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
      })
  }


    signUpFormSubmit(): void{
    const signUpFormData: SignUpFormData = this.signUpForm.value;

    this.authService.signUp(signUpFormData).subscribe(resp => {
      console.log(resp);
    })
  }
}
