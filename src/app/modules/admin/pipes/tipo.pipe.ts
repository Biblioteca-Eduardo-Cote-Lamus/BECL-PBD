import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tipo'
})
export class TipoPipe implements PipeTransform {

  transform(value: string): unknown {
    const values: {[key: string]:string} = {
      'A': 'Auditorio',
      'S': 'Sala de semilleros',
      'BD': 'Capacitación base de datos'
    }
    return values[value];
  }

}
