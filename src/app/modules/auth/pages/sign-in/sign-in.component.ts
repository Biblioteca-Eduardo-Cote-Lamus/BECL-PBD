import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sing-in.component.css'] 
})
export class SignInComponent {

  //Creando el form reactivo
  loginForm: FormGroup = this.fb.group({
    administrativeCode: [ '',
      [ 
        Validators.required,
        Validators.minLength(4), 
        Validators.maxLength(6),
        Validators.pattern('^[0-9]*$')
      ],
      ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ] 
    ]
  })

  triggerErrors  = false;

  //Inyectamos las dependencias
  constructor( private fb: FormBuilder) {}

  validateField(control: string){
    return this.loginForm.controls[control].touched && this.loginForm.controls[control].invalid 
  }

  submit(){
    if(! this.validateField('administrativeCode') && ! this.validateField('password'))
      this.triggerErrors = true;
  }
}
