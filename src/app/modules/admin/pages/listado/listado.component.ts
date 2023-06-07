import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EventosService } from '../../services/eventos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  public eventsList:any = []

  public filter = 1;

  constructor(
    private eventsService: EventosService
  ){ }


  ngOnInit(): void {
    this.changeEvents(this.filter)
  }

  public clear(table: Table) {
    table.clear();
  }

  public filtrar(event: any, table:Table){
    table.filterGlobal(event.target.value, 'contains')
  }

  public changeEvents(filter: number){
    this.filter = filter
    this.eventsService.getListEvents(this.filter).subscribe({
      next: events =>{
        console.log({filter: this.filter, events})
        this.eventsList = events
      }
    })
  }
}
