import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepService } from 'src/app/shared/services/step.service';
import { ReservationTicketService } from '../../services/reservation-ticket.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit{

  serviceForm: FormGroup  = this.fb.group({
    service: ['', [Validators.required] ],
    loan: ['', [Validators.required] ]
  });

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
  {   }

  ngOnInit(): void {
    this.serviceForm.valueChanges.subscribe(value => {
      this.service = value.service
    })
    this.changeService()
  }

  public changeStep(step: number){
    this.stepService.changeStepValue(step);  
  }

  public submit(){
    //obtengo la informacion del formulario y la guardo en el ticket
    this._service = {
      type: this.serviceForm.controls['service'].value,
      physicalSpace: this.formatLoanToCalendar()
    }
    
    //Envio la información al servicio y la guardo en el localStorage
    this.ticket.reservationTicket.service = this._service;
    this.ticket.saveOnLocalStorage();
    
    //avanzo al siguiente step
    this.stepService.changeStepValue(3)

  }

  public checkNextButton(){
    //si no se ha seleccionado ningún servicio y se le da al botón de enviar, cancelar al redirección. 
    if(!this.serviceForm.controls['service']?.value)
      return true;

    //si se selecciono el servicio de prestamo, pero no se selecciono el espacio se le da al botón de enviar, cancelar al redirección. 
    if(this.serviceForm.controls['service']?.value === 'prestamo' && !this.serviceForm.controls['loan'].value)
      return true;
    
    return false;
  }

  public checkedState(value: string){
    return this.serviceForm.controls['service']!.value === value || this.serviceForm.controls['loan']!.value === value
  }

  /**
   * Método para limpiar la selección del servicio en caso de que se haya seleccionado la opción de prestamo
   */
  public changeService(){
    this.service = ''
    this.serviceForm.get('service')?.setValue(null , {emitValue: false} )
  }

  /**
   * Método para obtener el formato de agendamiento en caso de que se seleccione un espacio (A: auditorio, S: semilleros, ST: sala trival)
   */
  public formatLoanToCalendar(){
    //{[key: string]: string} indicamos que la key es un string y el valor de dicha key es un string también
    const loanFormats: {[key: string]: string} = {
      'auditorio': 'A',
      'semilleros': 'S',
      'trival': 'ST',
    }

    return loanFormats[this.serviceForm.controls['loan'].value] || 'BD'
  }

}
