import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public firstNameAndLastName: string = '^[A-Za-z]+(?: [A-Za-z]+)*$'
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"



  public isValidField(field: string, form: FormGroup) {
    return form.controls[field].errors && form.controls[field].touched
  }

  isFieldOneEqualFieldTwo(fieldOne: string, fieldTwo: string) {

      return (formGroup:AbstractControl):ValidationErrors | null=>{
        const fieldValueOne=formGroup.get(fieldOne)?.value
        const fieldValueTwo=formGroup.get(fieldTwo)?.value

        if(fieldValueOne!=fieldValueTwo){
          formGroup.get(fieldTwo)?.setErrors({notEqual:true})
          return ({notEqual:true})
        }
        formGroup.get(fieldTwo)?.setErrors(null)
        return null
      }
  }
}
