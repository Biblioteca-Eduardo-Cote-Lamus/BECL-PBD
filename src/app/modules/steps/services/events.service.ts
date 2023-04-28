import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Events } from 'src/app/data/models/events.model';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _eventsUrl = enviroment.baseUrlLocal;

  constructor(
    private http: HttpClient
  ) { }
  
  /**
   * Método para consultar las horas de disponiblidad
   * @param {token, date, type} un objeto que contiene el token, la fecha de consulta y el tipo de evento que se solicita.
   */
  public getEvents( {token, dates, type } : {token:string, dates:string[], type:string} ):Observable<Events> {
    return this.http.post<Events>(`${this._eventsUrl}/events_PDB/`, {token,dates, type})
  }



}
