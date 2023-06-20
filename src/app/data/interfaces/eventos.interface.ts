export interface Evento {
    id?:                number;
    fecha?:             Date;
    fecha_registro?:    Date;
    dependencia?:       string;
    inicio?:            string;
    final?:             string;
    titulo?:            string;
    cantidad_personas?: number;
    tipo?:              string;
    encargados?:        string;
    observaciones?:     string;
    url_formato?:       string;
    usuario?:           string;
    estado?:            number;
    nombre?:            string
}
