import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Evento } from 'src/app/data/interfaces/eventos.interface';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') ?? ''
  })

  constructor(
    private http: HttpClient
  ) { }

  public getListEvents(filter = 1){
    const params = new HttpParams().append('filterId', filter)
    return this.http.get<Evento[]>(`${enviroment.baseUrlLocal}list-events`, {params}).pipe(
      map( events => this.transformReponse(events))
    )
  }

  public confirmEvent(id_event: number, state: number){
    return this.http.put(`${enviroment.baseUrlLocal}approve-event/`, {id_event, state}, {headers: this.headers})
  }

  private transformReponse(events: Evento[]){
    // realizamos el mapeo de cada objeto 
    return events.map(event => {
      const fecha_registro = new Date(`${event.fecha_solicitud}`)
      fecha_registro.setHours(fecha_registro.getHours()-4)

      return { 
        id: event.id,
        usuario: `${event.nombre}`,
        fecha_realizacion: [new Date(`${event.fecha_solicitada}`), `de ${event.inicio} a ${event.final}`],
        fecha_registro,
        dependencia: `${event.dependencia}`,
        titulo: `${event.titulo}`,
        personas: event.cantidad_personas,
        tipo: event.tipo,
        estado: event.estado,
        encargados: event.encargados,
        observaciones: event.observaciones
      }
    })

  }
}

