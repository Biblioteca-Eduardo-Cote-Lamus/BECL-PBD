import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { EventosService } from '../../services/eventos.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Evento, EventoUsuario } from 'src/app/data/interfaces/eventos.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit{

  public eventsList:Array<Evento> = []

  public filter = 1;
 
  public showEventConfirmtTrigger = true;

  public selectedEvent:Evento | null = null;

  public confirmTrigger = 1; 

  public triggerLoader = false;
  
  public notManagerSeleted = false;

  public manager: EventoUsuario | undefined;

  constructor(
    private eventsService: EventosService,
    private spinner: NgxSpinnerService
  ){ }

  public get errorClass(){
    return   this.notManagerSeleted ? "w-full border border-red-500" : "w-full"
  }
  


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

  public getManagerAlert(){
    return 
  }

  public showEventConfirmt (id: number, trigger: number) {
    this.selectedEvent = {...this.eventsList.find((event:Evento) => event.id == id) !};
    this.showEventConfirmtTrigger = true;
    this.confirmTrigger  = trigger;
  }

  public confirmEvent(){

    if(!this.manager){
      this.notManagerSeleted = true
      return 
    }

    this.spinner.show();
    this.eventsService.confirmEvent(this.selectedEvent!.id, this.manager.id).subscribe({
      next: res => {
        this.showEventConfirmtTrigger = false;
        this.spinner.hide();
        this.notManagerSeleted = false;
        window.location.reload();
      },
      error: err => {
        this.spinner.hide();
      }
    })
  }

  public closeModal() {
    this.manager = undefined;
    this.notManagerSeleted = false
  }
}
