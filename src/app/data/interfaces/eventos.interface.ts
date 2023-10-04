export interface EventoResponse {
  id:                number;
  fecha_solicitud:   Date;
  fecha_solicitada:  Date;
  dependencia:       string;
  inicio:            string;
  final:             string;
  titulo:            string;
  cantidad_personas: number;
  tipo:              string;
  encargados:        string;
  estado:            string;
  usuario:           Funcionario;
  funcionarios:      Funcionario[];
}

export interface Funcionario {
  id:         number;
  username:   string;
  first_name: string;
  last_name:  string;
}




export interface Evento extends Omit<EventoResponse,  'usuario' | 'funcionarios' | 'fecha_solicitud' | "fecha_solicitada" | "cantidad_personas" >{
  fechaSolicitud: Date,
  fechaSolicitada: Date,
  cantidadPersonas: number
  usuario: EventoUsuario,
  funcionarios: EventoUsuario[],
}

export type EventoUsuario =
  | { id: number; codigo: string; fullName: string }
