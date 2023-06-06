import { Component } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent {

  public listSize = [{size: 5},{size: 10},{size: 15},{size: 20}]

  public products = [
    {
      code: 1,
      name: "angel",
      category: 'A',
      quantity: 15
    },
    {
      code: 1,
      name: "jesus",
      category: 'A',
      quantity: 15
    },
    {
      code: 1,
      name: "miguel",
      category: 'A',
      quantity: 15
    },
    {
      code: 2,
      name: "gerson",
      category: 'A',
      quantity: 15
    },
  ]

  public clear(table: Table) {
    table.clear();
  }

  public filtrar(event: any, table:Table){
    table.filterGlobal(event.target.value, 'contains')
  }
}
