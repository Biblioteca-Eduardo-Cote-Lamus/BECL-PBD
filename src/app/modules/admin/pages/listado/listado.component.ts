import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EventosService } from '../../services/eventos.service';
import { State } from 'src/app/data/enums/state.enum';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  public eventsList:any = []

  public filter = 1;

  public state = State

  public showEventConfirmtTrigger = false;

  public selectedEvent:any;

  public confirmTrigger = 1; 

  public triggerLoader = false;

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
    this.triggerLoader = true;
    this.eventsService.getListEvents(this.filter).subscribe({
      next: events =>{
        this.eventsList = events
        this.triggerLoader = false;
      }
    })
  }

  public getBackgroundIndicatorColor( state: number){
    if(state == 1)
      return 'bg-orange-400'
    
    return state == 2 ? 'bg-[#008000]' : 'bg-red-600';
  }

  public showEventConfirmt (id: number, trigger: number) {
    this.selectedEvent = {...this.eventsList.find((event:any) => event.id == id)};
    this.showEventConfirmtTrigger = true;
    this.confirmTrigger  = trigger;
  }

  public confirmEvent(status: number){
    this.eventsService.confirmEvent(this.selectedEvent.id, status).subscribe({
      next: res => {
        this.showEventConfirmtTrigger = false
        window.location.reload();
      }
    })
  }
}
