import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';
import { ReservationTicketService } from '../../services/reservation-ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Hours {
  hour: number
  possibles: number[]
}

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  //Variable para controlar el step 4
  private _scheduleEvent = false;

  // Variable para testar la respueta del back 
  public start: Hours[] = 
  [
    {hour: 6,  possibles: [7, 8, 9]},
    {hour: 7,  possibles: [8, 9]},
    {hour: 8,  possibles: [9]},
    {hour: 12, possibles: [13]},
    {hour: 15, possibles: [16]},
    {hour: 17, possibles: [18]}
  ]

  //Lista de las horas de finalización
  public endHours: any = [ ];

  //Formulario reactivo para el control de la informacion del evento
  public eventForm: FormGroup = this.fb.group({
    title: [ , [Validators.required] ],
    people: [ , [ Validators.required, Validators.min(50)] ],
    date:  [ Date, [Validators.required ] ],
    start: [, [Validators.required] ],
    end: [, [Validators.required] ]
  });

  constructor(
    private stepService: StepService,
    private router: Router,
    private ticket: ReservationTicketService,
    private fb: FormBuilder
  ){}

  get sheduleEvent(){
    return this._scheduleEvent;
  }

  set changeSheduleEvent(value: boolean){
    this._scheduleEvent = value;
  }

  //Método para regresar al step 2
  back(){
    this.stepService.changeStepValue(2);
    this.router.navigateByUrl('/eventos/service')
  }

  //Método para regresar del step 4 al 3
  regresar(){
    this.changeSheduleEvent = false;
    this.stepService.changeStepValue(3);
  }

  //Método para enviar el formulario
  submit(){
    this.stepService.changeStepValue(4);
    this.changeSheduleEvent = true;
  }

  /**
   * Método para determinar la hora en formato 12h indicando si es a.m. o p.m
   * @param hour correspondiente a la hora a formatear
   * @returns Un string indicando la hora en formato pm o am.
   */
  public changeTwelveHour(hour: number){
    return hour > 12 ? `${Math.abs(hour - 12)} pm` : `${hour} am`
  }

  /**
   * Método para devolver la lista de horas de finalización una vez se haya seleccionado una hora de inicio
   * @param event recibe el evento del componente p-dropdown para obtener el value (possibles)
   * @returns No retorna nada, solo genera la lista de horas de finalización para cada hora de inicio
   */
  public endTimes(event: any){
    //Se borra cualquier elemento que ya exista primero
    this.endHours.splice(0, this.endHours.length); 
    
    //Se obtienen las horas posibles de finalizacion
    const { possibles } = event.value;
    
    //Teniendo las horas, se recorre cada hora y se añade a la lista de endHours
    possibles.forEach( (hour:number) => {
      this.endHours.push({ hour: `${this.changeTwelveHour(hour)}` })
    });

  }

  /**
   * Método para 'limpiar' el dropdown de las horas de finalización  
   * @returns 
   */
  public clearEndHoursList(){
    //Si aún no tenemos un valor, quiere decir que no hemos selecionado una hora de inicio, por tanto, no se hace nada.
    if(! this.eventForm.controls['end'].value )
      return  
    
    // Se resetea el valor del formulario en su campo 'end'
    this.eventForm.controls['end'].setValue(' ', {emitEvent: false})
  } 

  //Método de testeo para el formateo de horas
  algo(){
    //obtengo la fecha seleccionada
    //se debe de tener al  inicio: T00:00:00-05:00 Y para la hora final T23:59:59.999999-05:00
    const fecha = new Date(this.eventForm.controls['date']?.value).toISOString().split('T');
    const fechaInicio = `${fecha[0]}T00:00:00-05:00`
    const fechaFinal = `${fecha[0]}T23:59:59.999999-05:00`
    console.log({fechaInicio, fechaFinal});

    // console.log(`la fecha seleccionada ${fecha}`);
    
    // console.log(`seleccionada la fecha ${this.eventForm.controls['date']?.value}`);
    
  }
}
