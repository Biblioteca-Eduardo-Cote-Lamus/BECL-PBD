import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';
import { Events } from 'src/app/data/models/events.model';
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
  public getEvents( {token, dates, type } : {token:string, dates:string[], type:string} ):Observable<Events> {
    return this.http.post<Events>(`${this._eventsUrl}events_PDB/`, {token,dates, type})
  }

  public saveEvent( {token, data}: {token: string, data: any} ): Observable<any>{
    const {title, dates, emails} = data
    console.log(data);
    
    return this.http.post<any>(`${this._saveUrl}schedule_PDB/`,  {token, title, dates, emails}).pipe( map( res => res.ok ) )
  }

}
