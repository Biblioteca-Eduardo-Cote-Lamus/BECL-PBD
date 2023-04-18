import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';
import { ReservationTicketService } from '../../services/reservation-ticket.service';
import { Usuario } from 'src/app/data/interfaces/usuario.interface';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent implements OnInit{

  private _personalInfo: Usuario = {} as Usuario;

  constructor(
    private router: Router,
    private stepService: StepService,
    private ticket: ReservationTicketService
  ){}


  ngOnInit(): void {
    //TODO: después se tiene que cambiar el localstorage por el usuarioasObservable
    
    //leo los datos del localStorage
    this._personalInfo = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!)  : {}; 
    //guardo los datos en la variable global 
  }

  public get personalInfo(){
    return this._personalInfo
  }

  //Método para obtener el nombre en formato N A 
  public getNormalName(){

    const length = this.personalInfo.user_name.length;
    const names = length > 3 ? this.personalInfo.user_name.split(' ').slice(2).join(' ') : this.personalInfo.user_name.split(' ').slice(1).join(' ');
    const lastNames = length > 3 ? this.personalInfo.user_name.split(' ').slice(0,2).join(' ') : this.personalInfo.user_name.split(' ').slice(0,1).join(' ');

    return `${names} ${lastNames}`
  }

  public submit(){
    this.stepService.changeStepValue(2);

    //guardamos la información el ticketService
    this.ticket.reservationTicket.personalInformation = this.personalInfo;

    this.router.navigateByUrl('eventos/service')
  }
}
