import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { StepService } from 'src/app/shared/services/step.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sing-in.component.css'] 
})
export class SignInComponent implements OnInit{

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
      ] 
    ]
  })

  triggerErrors  = false;

  //Inyectamos las dependencias
  constructor( 
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private stepper: StepService
  ) {  }

  ngOnInit(): void {

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
    next: ({ok, error})=> {
        if(!ok){
          //TODO: Mostrar modal o algun indicador de que no salio bien 
          Swal.fire({
            title: '¡Error!',
            text: `${error}`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          return;
        }
        let rol = ''
        this.authService.getcurrentUserObservable.subscribe(user => rol = user.user_rol)
        
        if(rol == 'Usuario')
          this.router.navigateByUrl('/eventos/personal-info')
        
        if(rol == 'Administrador')
          this.router.navigateByUrl('/admin')

      }
    });



  }
}
