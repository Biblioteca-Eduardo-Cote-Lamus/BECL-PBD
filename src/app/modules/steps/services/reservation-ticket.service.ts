import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationTicketService {

  //Variable para menejar toda la información de la reserva 
  private _reservationTicket = {
    personalInformation: {
      name: '',
      email: '',
      faculty: ''
    },
    service: {
      type: '',
      physicalSpace: '' //si es vacio, luego es una capacitacion
    },
    event: {
      title: '',
      people: 0,
      date: '',
      start: '',
      end: ''
    }
  }

  constructor() { 
    if( localStorage.getItem('ticket') )
      this._reservationTicket = JSON.parse(localStorage.getItem('ticket')!)
  }

  //Get para devolver el ticket de reserva 
  public get reservationTicket() {
    return this._reservationTicket;
  }

  public saveOnLocalStorage(){
    localStorage.setItem('ticket', JSON.stringify(this._reservationTicket))
  }
}
