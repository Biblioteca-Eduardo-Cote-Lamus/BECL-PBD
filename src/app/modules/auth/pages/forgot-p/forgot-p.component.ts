import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ForgotPaswordService } from '../../services/forgot-pasword.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-p',
  templateUrl: './forgot-p.component.html',
  styleUrls: ['./forgot-p.component.css']
})
export class ForgotPComponent implements OnInit{

// ========================================================================= 

  // Declaracion de variables de control general.
  
  public validEmail = true;
  
  public triggerLoad = false;
  
  public showCode = false;
  
  public showChangePassword = false;

  public wrongPassword = false;
  
  public email = '';

  private _forgotToken = ''; 

  private otpCode = ''



// =============================================================================

// Variables y elementos para trabjar con los inputs de la verificacion del código. 

  @ViewChild('digit1Input') digit1Input!: ElementRef;
  @ViewChild('digit2Input') digit2Input!: ElementRef;
  @ViewChild('digit3Input') digit3Input!: ElementRef;
  @ViewChild('digit4Input') digit4Input!: ElementRef;
  @ViewChild('digit5Input') digit5Input!: ElementRef;
  @ViewChild('digit6Input') digit6Input!: ElementRef;

  public otpForm: FormGroup =  this.fb.group({
      digit1: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
      digit2: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
      digit3: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
      digit4: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
      digit5: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
      digit6: ['', [ Validators.required, Validators.pattern(/[0-9]/) ]],
    })

// =============================================================================

  // Formulario de control para las contraseñas 
  
    public passwordsForm: FormGroup = this.fb.group({
    newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]]
  })



// =============================================================================

  constructor (
    private fPassword: ForgotPaswordService,
    private fb: FormBuilder,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.otpForm.valueChanges.subscribe( (value) => {
      if (this.otpForm.valid) 
        this.otpCode = Object.values(value).join('');

      this.changeFocus(value)
    })
  }

// ===================================================================================================================================

  /**
   * Método para validar que el correo que se escribe es en formato @ufps.edu.co
   */
  public validateEmail(){
    const emailRegex = /^[a-zA-Z]+@ufps.edu.co$/;
    this.validEmail = emailRegex.test(this.email)
  }

  /**
   * Método para solicitar el cambio de contraseña al backend a través del correo.
   * @returns Detiene la ejecución del resto de acciones en caso que ocurra un error en el backend
   */
  public submit(){
    // Condicion para validar si no se ha escrito nada en el input.
    if(this.email.length == 0 &&  this.validEmail){
      this.validEmail = false; //para mostrar los errores
      return 
    }

    this.triggerLoad = true; 

    this.fPassword.validateEmail({email: this.email}).subscribe({
      next: ({ok, token}:any) => {
        
        if (!ok){
          Swal.fire({
            title: '¡Error!',
            text: `Ha ocurrido un error. Intenta enviar de nuevo el correo. `,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
          return
        }        
        this.triggerLoad = false;
        this._forgotToken = token; 
        this.showCode = true;
      }
    })

  }

  public getSubtitle(){
    return this.triggerLoad ? `Hemos enviado un código de verificación al correo ${this.email}`: 'Por favor, ingresa el correo institucional. Le enviaremos un código de verificación.'
  }

// ===================================================================================================================================



// ================================================================================================================================================================================================================

// Métodos relacionado al funcionamiento de la validacion del codigo de verificacion

  /**
   * Método que envia la peticion al backend para validar el código que fue enviado al correo del usuario.
   */
  public validateCode(){
    const data = {
      token: this._forgotToken,
      codeVery: this.otpCode
    }
    this.triggerLoad = true;

    this.fPassword.validateCode(data).subscribe({
      next: res => {
        console.log(res)
        this.showCode = false
        this.triggerLoad = false;
        this.showChangePassword = true;
      }
    })
  }

  /**
   * Método para controlar el cambio de foco entre los inputs para la verificación del codigo
   * @param value el valor que retonar el formulario reactivo en su metodo valueChanges.
   */
  private changeFocus(value: any){
    if (value.digit1.length === 1) {
      this.digit2Input.nativeElement.focus();
    }
    if (value.digit2.length === 1) {
      this.digit3Input.nativeElement.focus();
    }
    if (value.digit3.length === 1) {
      this.digit4Input.nativeElement.focus();
    }
    if (value.digit4.length === 1) {
      this.digit5Input.nativeElement.focus();
    }
    if (value.digit5.length === 1) {
      this.digit6Input.nativeElement.focus();
    }
  }

//======================================================================================================================================================================================================================================================================

 public changePassword(){

  const password = `${this.passwordsForm.controls['newPassword'].value}`
  const confirPassword = `${this.passwordsForm.controls['confirmPassword'].value}`

  if( password.length === 0 || confirPassword.length === 0 || ! this.validatePasswords(password, confirPassword)){
    this.wrongPassword = true;
    return 
  }

  this.fPassword.updatePassword({token:this._forgotToken, email: this.email, password}).subscribe({
    next: res => {
      Swal.fire({
        title: '¡Cambio realizado con éxito!',
        text: 'Se ha cambiado correctamente la contraseña.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(value => {
        if(value.isConfirmed)
          this.router.navigate(['/auth'])
      })


    }
  })

 }

 public validatePasswords(password: string, confirp:string){
  return password === confirp
 }

}
