import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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


  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)

  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]]
  })

  login() {
    const { email, password } = this.authForm.value
    this.authService.login(email, password)
      .subscribe({
        next: () => this.router.navigateByUrl('/books/list-books'),
        error: (message) => {
          console.error("Error",message)
        },
      })
  }

}
