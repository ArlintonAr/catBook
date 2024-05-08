import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidatorsService } from '../../../shared/services/service-shared.service';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-auth',
  standalone: true,
  imports: [

    ReactiveFormsModule
  ],
  templateUrl: './register-auth.component.html',
  styleUrl: './register-auth.component.css'
})
export default class RegisterAuthComponent {

  public errorsInternal: string = ''

  private fb = inject(FormBuilder)
  private validatorsService = inject(ValidatorsService)
  private authService = inject(AuthService)
  private route = inject(Router)


  public registerForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.pattern(this.validatorsService.firstNameAndLastName)]],
      email: ['', [Validators.required, Validators.pattern(this.validatorsService.emailPattern)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordRepeat: ['', [Validators.required]]
    },
    {
      validators: [this.validatorsService.isFieldOneEqualFieldTwo('password', 'passwordRepeat')]
    }

  )

  isValidField(field: string ) {
    return this.validatorsService.isValidField(field, this.registerForm)
  }

  onSubmit() {
    const { name, email, password } = this.registerForm.value

    if (this.registerForm.valid) {
      this.authService.registerUser(name, email, password)
        .subscribe(
          {
            next: () => this.route.navigateByUrl('/books/list-books'),
            error: ( message) => {
              this.errorsInternal = message
            }
          }
        )
    }
      this.errorsInternal='Verifica todos los campos'
  }



  back(){
    this.route.navigateByUrl('/auth/login')
  }
}
