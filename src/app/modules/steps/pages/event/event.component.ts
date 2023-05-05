import { Component, OnInit, EventEmitter } from '@angular/core';
import { StepService } from 'src/app/shared/services/step.service';
import { ReservationTicketService } from '../../services/reservation-ticket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from '../../services/events.service';
import { EventsHour } from 'src/app/data/models/events.model';
import { holidays } from 'src/app/data/const/holidays.const';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit{

  //Variable para controlar el step 4
  private _scheduleEvent = false;

  //Varibales para controlar la fecha minima (siempre el dia actual) y la fecha máxima (sin limites)
  public minDate: Date = new Date();
  public maxDate!: Date 
  private _selectFDate!: Date;
  
  // Variable para testar la respueta del back 
  public start: EventsHour[] = []

  //Lista de las horas de finalización
  public endHours: any = [ ];

  public finalRes: any;

  //Formulario reactivo para el control de la informacion del evento
  public eventForm: FormGroup = this.fb.group({
    title: [ , [Validators.required] ],
    people: [ , [ Validators.required] ],
    date:  [ Date , [Validators.required ] ],
    start: [, [Validators.required] ],
    end: [, [Validators.required] ]
  });

  constructor(
    private stepService: StepService,
    private eventService: EventsService,
    private ticket: ReservationTicketService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.eventForm.controls['people'].setValidators(Validators.min(this.setMinPeopleValitador()));
  }

  get sheduleEvent(){
    return this._scheduleEvent;
  }

  get typeService(){
    // this.ticket.reservationTicket.service.physicalSpace
    return ! localStorage.getItem('ticket') ? this.ticket.reservationTicket.service.physicalSpace : JSON.parse(localStorage.getItem('ticket')!)['service']['physicalSpace']
  }

  get Ticket(){
    return {...this.ticket.reservationTicket}
  }

  get disableDates(): Date[]{
    return holidays
  }

  set changeSheduleEvent(value: boolean){
    this._scheduleEvent = value;
  }

  //Método para regresar al step 2
  back(){
    this.stepService.changeStepValue(2);
  }

  //Método para regresar del step 4 al 3
  regresar(){
    this.changeSheduleEvent = false;
    this.stepService.changeStepValue(3);
  }

  /**
   * Método para enviar la información al backend y que se agende el evento/capacitación 
   */
  submit(){

    //Guardamos toda la información en el ticket de reserva
    this.saveEventInfo()
    this.stepService.changeStepValue(4);
    this.changeSheduleEvent = true;
    this.saveEventOnCalendar();
  }

  /**
   * Método para determinar la hora en formato 12h indicando si es a.m. o p.m
   * @param hour correspondiente a la hora a formatear
   * @returns Un string indicando la hora en formato pm o am.
   */
  public changeTwelveHour(hour: number){
    return hour > 12 ? `${Math.abs(hour - 12)}:00 pm` : `${hour}:00 am`
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
    const { possible } = event.value;
    
    //Teniendo las horas, se recorre cada hora y se añade a la lista de endHours
    possible.forEach( (hour:number) => {
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

  saveDate(){
    this._selectFDate = new Date(this.eventForm.controls['date']?.value);
  }

  //Método de testeo para el formateo de horas
  public getFormatDate(){

    //Validamos si se volvio a seleccionar la misma fecha para evitar tener que volver a hacer la petición. 
    if(this._selectFDate != null &&  (this._selectFDate.getTime() == new Date(this.eventForm.controls['date']?.value).getTime()))
      return

    //limpio lo que tenga seleccionado antes en las horas de inicio
    if(this.start.length > 0)
      this.start.length = 0;  
    //obtengo la fecha seleccionada
    //se debe de tener al  inicio: T00:00:00-05:00 Y para la hora final T23:59:59.999999-05:00
    const fecha = new Date(this.eventForm.controls['date']?.value).toISOString().split('T');
    const fechaInicio = `${fecha[0]}T00:00:00-05:00`
    const fechaFinal = `${fecha[0]}T23:59:59.999999-05:00`
    
    //obtengo el token del localStorage
    const token = localStorage.getItem('token') || '';

    this.eventService.getEvents({token, dates:[fechaInicio, fechaFinal], type:this.typeService }).subscribe(
      {
        next: hours  =>{
          if (hours.length > 0){
            this.start = hours;
            this.saveDate();
          }
          else{
            Swal.fire({
              title: '¡Error!',
              text: `Lo sentimos, pero paraece ser que para el ${fecha[0]} no hay espacios disponibles para realizar la solicitud. Intente con un nuevo día.`,
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
            this.eventForm.controls['date'].setValue(null, {eventEmitter: false})
          } 

        }
      }
    )
  }

  /**
   * Método para guarda la información ingresada en este punto del formulario.
   */
  public saveEventInfo(){
    const event = {
      title: this.eventForm.controls['title'].value,
      people: this.eventForm.controls['people'].value,
      date: new Date(this.eventForm.controls['date']?.value).toISOString().split('T')[0],
      start: this.eventForm.controls['start'].value['hours'],
      end: this.eventForm.controls['end'].value['hour']
    }

    this.ticket.reservationTicket.event = {...event };
    this.ticket.saveOnLocalStorage();
  }

  /**
   * Método para extraer la información del ticket y enviarla a agendar.
   */
  public saveEventOnCalendar(){
    const token = localStorage.getItem('token') || ''
    const data = {
      title: this.Ticket.event.title,
      dates: [`${this.Ticket.event.date}T0${this.Ticket.event.start.slice(0,4)}:00-05:00`,`${this.Ticket.event.date}T0${this.Ticket.event.end.slice(0,4)}:00-05:00`],
      emails: [ this.Ticket.personalInformation.email ],
      type: this.Ticket.service.physicalSpace
    }
    this.eventService.saveEvent({token, data}).subscribe(
      { next: res => {
          this.finalRes = res; 
          console.log(res);
      }
     })
  }

  /**
   * Método para determinar si un input es invalido. Se aplica si el input fue tocado y es invalido. 
   * @param input nombre del input (control) para aplicar la validación
   * @returns true o false 
   */
  public invalidInput(input: string) {
    return this.eventForm.controls[input].touched && this.eventForm.controls[input].invalid
  }

  /**
   * Método para establecer la cantidad minima de personas para prestar el espacio o servicio.
   * @returns la cantidad de personas minimas para prestar el espacio o servicio
   */
  public setMinPeopleValitador(){
    const minValidators: {[key:string]: number} = {
      'A': 30,
      'S': 5,
      'ST': 20,
      'BD': 8
    }
    return minValidators[this.ticket.reservationTicket.service.physicalSpace];
  }

  public getErrorPeopleMessage(){
    const minPeople = this.setMinPeopleValitador();

    if(this.ticket.reservationTicket.service.type == 'prestamo'){
      return `Para reservar el espacio solicitado se requieren como minimo ${minPeople} personas;`
    }

    return `Para realizar la capacitación solicitada se requieren como minimo ${minPeople} personas`;
  }

}
