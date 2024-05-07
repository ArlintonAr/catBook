import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ValidatorsService } from '../../../shared/services/service-shared.service';

@Component({
  selector: 'app-login-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login-auth.component.html',
  styleUrl: './login-auth.component.css'
})
export default class LoginAuthComponent {

  public errorLogin: string = ''

  private fb = inject(FormBuilder)
  private validatorService = inject(ValidatorsService)

  private authService = inject(AuthService)
  private router = inject(Router)

  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  },
    {
      validators: [
        //Aqui validaciones para coparar contraseñas al momento de registrarse
      ]
    }

  )
  constructor() {

  }

  login() {

    const { email, password } = this.authForm.value
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/books/list-books'),
        error: (message) => {
          console.error("Error", message)
          this.errorLogin = message
        },
      })

  }



  navigateRegister() {
    this.router.navigateByUrl('/auth/register')
  }
}
