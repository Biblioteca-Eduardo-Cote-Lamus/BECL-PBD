import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { EventoUsuario, Funcionario } from 'src/app/data/interfaces/eventos.interface';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {

  private headers = new HttpHeaders({
    Authorization: localStorage.getItem('token') ?? '',
  });


  constructor(
    private http: HttpClient
  ) { }

  getAllManagers() {
    return this.http.get<Funcionario[]>(`${enviroment.baseUrlLocal}managers`, { headers: this.headers }).pipe(
      map(managers => this.mappedResponse(managers))
    )
  }

  private mappedResponse(managers: Funcionario[]): EventoUsuario[] {
    return managers.map(manager => ({
      id: manager.id,
      codigo: manager.username,
      fullName: `${manager.last_name} ${manager.first_name}`,
      isActive: manager.is_active,
      email: manager?.email,
      cargo: manager?.cargo,
      ubicacion: manager?.ubicacion
    }))
  }
}
