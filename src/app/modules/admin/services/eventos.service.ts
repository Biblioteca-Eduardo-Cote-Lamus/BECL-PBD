import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import {
  Evento,
  EventoResponse,
  EventoUsuario,
  Funcionario,
} from 'src/app/data/interfaces/eventos.interface';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EventosService {
  private headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') ?? '',
  });

  constructor(private http: HttpClient) {}

  public getListEvents(filter = 1) {
    const params = new HttpParams().append('filterId', filter);
    return this.http
      .get<EventoResponse[]>(`${enviroment.baseUrlLocal}list-events`, {
        params,
      })
      .pipe(map((events) => this.transformReponse(events)));
  }

  public confirmEvent(id_event: number, managerId: number) {
    return this.http.put(
      `${enviroment.baseUrlLocal}approve-event/`,
      { id_event, managerId },
      { headers: this.headers }
    );
  }

  private transformReponse(events: EventoResponse[]): Evento[] {
    // realizamos el mapeo de cada objeto
    return events.map((event) => {
      const fecha_registro = new Date(`${event.fecha_solicitud}`);
      fecha_registro.setHours(fecha_registro.getHours() - 4);

      return {
        ...event,
        cantidadPersonas: event.cantidad_personas,
        fechaSolicitada: new Date(`${event.fecha_solicitada}T00:00:00`),
        fechaSolicitud: fecha_registro,
        usuario: {
          id: event.usuario.id,
          codigo: event.usuario.username,
          fullName: `${event.usuario.last_name} ${event.usuario.first_name}`,
        },
        funcionarios: event.funcionarios.map((funcionario: Funcionario): EventoUsuario => ({
          id: funcionario.id,
          codigo: funcionario.username,
          fullName: `${funcionario.last_name} ${funcionario.first_name}`,
        })),
      };

    });
  }
}
