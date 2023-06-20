import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'states'
})
export class StatesPipe implements PipeTransform {

  transform(value: number): string {
    const values: {[key: number]: string} = {
      1: "Revisar",
      2: "Aceptado",
      3: 'Rechazado'
    }
    return values[value];
  }

}
