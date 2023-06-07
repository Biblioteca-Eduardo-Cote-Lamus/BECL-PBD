import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Evento } from 'src/app/data/interfaces/eventos.interface';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EventosService {



  constructor(
    private http: HttpClient
  ) { }

  public getListEvents(filter = 1){
    const params = new HttpParams().append('filterId', filter)
    return this.http.get<Evento[]>(`${enviroment.baseUrlLocal}list-events`, {params}).pipe(
      map( events => this.transformReponse(events))
    )
  }

  private transformReponse(events: Evento[]){
    // realizamos el mapeo de cada objeto 
    return events.map(event => {
      const fecha_registro = new Date(`${event.fecha_registro}`)
      fecha_registro.setHours(fecha_registro.getHours()-4)

      return { 
        id: event.id,
        usuario: `${event.nombre} ${event.usuario}`,
        fecha_realizacion: [new Date(`${event.fecha}`), `de ${event.inicio} a ${event.final}`],
        fecha_registro,
        dependencia: `${event.dependencia}`,
        titulo: `${event.titulo}`,
        personas: event.cantidad_personas,
        tipo: event.tipo,
        estado: event.estado
        
      }
    })

  }
}

// ===================================
/**
 * 
 *     const eventExample = [
      {
          "id": 2,
          "fecha_registro": "2023-06-06T22:22:41.385127Z",
          "usuario ": "GARCIA RANGEL ANGEL GABRIEL 07409",
          "fecha": "2023-05-19 de 6:00 pm a 8:00 pm",
          "dependencia": "Division de Biblioteca",
          "titulo": "Auditorio de prueba",
          "cantidad_personas": 45,
          "tipo": "BD",
          "estado": 1
      }
    ]

 */
