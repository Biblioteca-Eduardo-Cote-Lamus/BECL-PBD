export interface Evento {
  id?: number;
  fecha_solicitada?: Date;
  fecha_solicitud?: Date;
  dependencia?: string;
  inicio?: string;
  final?: string;
  titulo?: string;
  cantidad_personas?: number;
  tipo?: string;
  encargados?: string;
  observaciones?: string;
  url_formato?: string;
  usuario?: string;
  estado?: number;
  nombre?: string;
}
