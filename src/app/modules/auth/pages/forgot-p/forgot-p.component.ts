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

  public otpCode = ''

  public invalidCodeTrigger = false;

  public shutDownCounter!:number;

  private interval!:any;


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
    private router: Router,
  ) {}


  ngOnInit(): void {
    clearInterval(this.interval)
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
    this.shutDownCounter = 59;

    this.fPassword.validateEmail({email: this.email}).subscribe({
      next: ({ok, token, message}:any) => {
        this.triggerLoad = false;

        if (!ok){
          Swal.fire({
            title: `${message}`,
            text: `El correo que has proporcionado no se encuentra registrado.`,
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })  
          return
        }       

        //activo el intervalo para reenviar hablitar el reenvio del código.
        this.interval = setInterval( () => {
          if(this.shutDownCounter > 0) {
            this.shutDownCounter--;
          } else {
            clearInterval(this.interval);
          }
        }, 1000);

        this._forgotToken = token; 
        this.showCode = true;
      },
      error: err => {
        //si ocurre alguno error, no se debe de cargar la pantalla de carga.
        this.triggerLoad = false;
      }
    })

  }

  /**
   * Método para retornar el susbtitulo en la fase de recuperarción de contraseña.
   * @returns El subtitulo que indica si se tiene que ingresar el correo electronico o si ya se envio el código de verificación
   */
  public getSubtitle(){
    return this.triggerLoad ? `Hemos enviado un código de verificación al correo ${this.email}`: 'Por favor, ingresa el correo institucional. Le enviaremos un código de verificación.'
  }

  /**
   * Método para cancelar la recuperación de contraseña
   */
  public cancel(){
    this.router.navigate(['/auth']);
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
      next: (res:any) => {

        this.triggerLoad = false;

        if(! res.ok) {
          this.invalidCodeTrigger = true;
          return 
        }

        this.showCode = false
        this.showChangePassword = true;
      },
      error: err => {
        this.showCode = false
        this.triggerLoad = false;
        this.invalidCodeTrigger = true;
      }
    })
  }

  /**
   * Método para limitar a un input type text de que sea solo numeros permitidos 
   * @param event evento de pressdown
   */
  public soloNumeros(event:any){
    const tecla = event.key;
    const esNumero = /^\d$/.test(tecla);
    const esTeclaPermitida = (tecla === 'Backspace' || tecla === 'Enter');
    if (!esNumero && !esTeclaPermitida) {
      event.preventDefault();
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
