import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';
import { ReservationTicketService } from '../../services/reservation-ticket.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{

  myForm!: FormGroup;
  service: string = '';
  private _service = {
      type: '',
      physicalSpace: ''
   };

  constructor(
    private stepService: StepService ,
    private fb: FormBuilder,
    private ticket: ReservationTicketService
  )
  {
      this.myForm = this.fb.group({
        service: ['', [Validators.required] ],
        loan: ['', [Validators.required] ]
      });

      this.myForm.valueChanges.subscribe(value => {
        this.service = value.service
      })

    
   }
  ngOnInit(): void {
    
    //consulto si el servicio ya fue seleccionado
    if(this.ticket.reservationTicket.service.type.length > 0)
      this.myForm.controls['service'].setValue(this.ticket.reservationTicket.service.type, {emitEvent: false})
    
      //consulto si el espacio ya fue seleccionado
    if(this.ticket.reservationTicket.service.physicalSpace.length > 0)
      this.myForm.controls['loan'].setValue(this.ticket.reservationTicket.service.physicalSpace, {emitEvent: false})

    // Limpio el servicio seleccionado en caso de que en el step 3 se devuelva al 3
    this.changeService()
  }

  changeStep(step: number){
    this.stepService.changeStepValue(step);
    console.log(this._service);
    
  }

  submit(){

    //si no se ha seleccionado ningún servicio y se le da al botón de enviar, cancelar al redirección. 
    if(!this.myForm.controls['service']?.value)
      return 

    //si se selecciono el servicio de prestamo, pero no se selecciono el espacio se le da al botón de enviar, cancelar al redirección. 
    if(this.myForm.controls['service']?.value === 'prestamo' && !this.myForm.controls['loan'].value)
      return 
    
    //obtengo la informacion del formulario y la guardo en el ticket
    this._service = {
      type: this.myForm.controls['service'].value,
      physicalSpace: this.formatLoanToCalendar()
    }
    
    //Envio la información al servicio y la guardo en el localStorage
    this.ticket.reservationTicket.service = this._service;
    this.ticket.saveOnLocalStorage();
    
    //avanzo al siguiente step
    this.stepService.changeStepValue(3)

  }

  checkedState(value: string){
    return this.myForm.controls['service']!.value === value || this.myForm.controls['loan']!.value === value
  }

  /**
   * Método para limpiar la selección del servicio en caso de que se haya seleccionado la opción de prestamo
   */
  changeService(){
    this.service = ''
    this.myForm.get('service')?.setValue(null , {emitValue: false} )
  }

  /**
   * Método para obtener el formato de agendamiento en caso de que se seleccione un espacio (A: auditorio, S: semilleros, ST: sala trival)
   */
  public formatLoanToCalendar(){
    //{[key: string]: string} indicamos que la key es un string y el valor de dicha key es un string también
    const loanFormats: {[key: string]: string} = {
      'auditorio': 'A',
      'semilleros': 'S',
      'trival': 'ST'
    }

    return loanFormats[this.myForm.controls['loan']?.value]  || "BD"
  }

}
