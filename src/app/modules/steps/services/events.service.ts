import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map} from 'rxjs';
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
        console.log(eventos);
        
        //obtengo la hora actual
        const today = new Date();
        const currentDate = today.toISOString().split('T')[0];
        //Si la fecha seleccionada es la fecha actual, se filtran las horas mayores a la actual. Ejemplo, si se hace la peticion a las 6am, luego se retorna todas las horas mayores a esta.
        //en caso contrario. se devuelven todas las horas sin problema alguno.
        return currentDate == dates[0].split('T')[0]  ? 
               eventos.events_hours.filter(i => {
                  const hourNumber = i.hours.includes('pm') ? parseInt(i.hours[0])+12 : parseInt(i.hours.split(':')[0]);
                  return type == 'BD' ? hourNumber > today.getHours() && hourNumber <= 17 : hourNumber > today.getHours();
                }) : type == 'BD' ? eventos.events_hours.filter(i => {
                  const hourNumber = i.hours.includes('pm') ? parseInt(i.hours[0])+12 : parseInt(i.hours.split(':')[0]);
                  return  hourNumber <= 17 
                }) : eventos.events_hours
      })
    )
  }

  public saveEvent( {token, data}: {token: string, data: any} ): Observable<any>{
    const {title, dates, emails} = data 
    return this.http.post<any>(`${this._saveUrl}schedule_PDB/`,  {token, title, dates, emails}).pipe( map( res => res.ok ) )
  }

}
