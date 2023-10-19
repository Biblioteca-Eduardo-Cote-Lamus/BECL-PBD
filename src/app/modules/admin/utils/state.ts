const STATES_EVENT: {[key:string]: string} = {
    "Pendiente": "bg-[#bc6c25] text-[#fefae0]",
    "Aceptado": "bg-[#264653] text-[#fefae0]",
    "Rechazado": "bg-[#d90429] text-[#fefae0]",
    "Cancelado": "bg-[#f58549] text-[#fefae0]",
}

// Funcion para devolver el color de la etiqueta respecto al estado
export const getStateStyle = (state: string) => {
    return STATES_EVENT[state]
}