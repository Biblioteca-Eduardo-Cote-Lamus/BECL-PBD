import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap} from 'rxjs';
import { Events, EventsHour } from 'src/app/data/models/events.model';
import { enviroment } from 'src/app/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _eventsUrl = enviroment.baseUrlLocal;
  private _saveUrl = enviroment.baseUrlAuth

  constructor(
    private http: HttpClient
  ) { }
  
  /**
   * Método para consultar las horas de disponiblidad
   * @param {token, date, type} un objeto que contiene el token, la fecha de consulta y el tipo de evento que se solicita.
   */
  public getEvents( {token, dates, type } : {token:string, dates:string[], type:string} ):Observable<EventsHour[]> {
    return this.http.post<Events>(`${this._eventsUrl}events_PDB/`, {token,dates, type}).pipe(
      map( eventos => {
        //obtengo la hora actual
        const today = new Date();
        const currentDate = today.toISOString().split('T')[0];
        const date = dates[0].split('T')[0];
        //Si la fecha seleccionada es la fecha actual, se filtran las horas mayores a la actual. Ejemplo, si se hace la peticion a las 6am, luego se retorna todas las horas mayores a esta.
        //en caso contrario. se devuelven todas las horas sin problema alguno.

        return currentDate == date || type == 'BD' ?  this.finalHours(eventos, currentDate, date, type, today.getHours()) : eventos.events_hours
              
      })
    )
  }

  public saveEvent( {token, data}: {token: string, data: any} ): Observable<any>{
    return this.http.post<any>(`${this._eventsUrl}schedule_PDB/`,  {token, data})
  }
  
  public downloadDocument({name, type}: {name: string, type: string}){
    return this.http.post(`${this._eventsUrl}download/`, {name, type}, { responseType: 'blob' } )
  }


  private finalHours(eventos: Events, currentDate: string, date: string, type: string, hours: number) {

    return eventos.events_hours.filter(evento => {
      // obtengo la hora en formato numero y en 24h
      const hourNumber = evento.hours.includes('pm') ? parseInt(evento.hours[0]) + 12 : parseInt(evento.hours.split(':')[0]);
      
      if (currentDate == date) {
        if (type == 'BD') {
          evento.possible = hourNumber < 17 ? [evento.possible[0], evento.possible[1]] : [evento.possible[0]];
          return hourNumber > hours && hourNumber <= 17;
        }
        return hourNumber > hours;
      }
  
      if (type == 'BD' && currentDate !== date){
        evento.possible = hourNumber < 17 ? [evento.possible[0], evento.possible[1]] : [evento.possible[0]];
        return hourNumber <= 17;
      }
      
      return true;
    });

  }


}


