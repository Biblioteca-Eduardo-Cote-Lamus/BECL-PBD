import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
        Validators.minLength(4)
      ] 
    ]
  })

  triggerErrors  = false;

  //Inyectamos las dependencias
  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('step')
    localStorage.removeItem('ticket')
  }

  validateField(control: string){
    return this.loginForm.controls[control].touched && this.loginForm.controls[control].invalid 
  }

  validateNoTouchedInput(control: string){
    return this.loginForm.controls[control].invalid;
  }

  submit(){
    if((this.validateNoTouchedInput('administrativeCode') && this.validateNoTouchedInput('password')) || this.loginForm.invalid){
      this.triggerErrors = true;
      return
    }
      
    const username = this.loginForm.controls['administrativeCode'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(username, password).subscribe({
    next: ({ok})=> {
        // if(!ok){
        //   //TODO: Mostrar modal o algun indicador de que no salio bien 
        //   return;
        // }
        this.router.navigateByUrl('/eventos/personal-info')
      }
    });



  }
}
