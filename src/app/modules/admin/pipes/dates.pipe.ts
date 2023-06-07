import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dates'
})
export class DatesPipe implements PipeTransform {

  private MONTHS = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  private DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

  transform(value: Date , dateIdentify: string ): unknown {
    let format = this.convertToHumanDate(value);
    
    if(dateIdentify === 'registro'){
      value.setHours(value.getHours() - 5);
      format += `a las ${value.toISOString().split('T')[1].split('.')[0]}`
    }

    return format;
  }

  private convertToHumanDate (value: Date){
    return `${ this.MONTHS[value.getMonth()] }, ${value.getDate()} de ${value.getFullYear()} `
  }
}
