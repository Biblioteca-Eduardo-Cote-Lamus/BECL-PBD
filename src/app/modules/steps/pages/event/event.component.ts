import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {

  private _scheduleEvent = false;

  constructor(
    private stepService: StepService,
    private router: Router
  ){}

  get sheduleEvent(){
    return this._scheduleEvent;
  }

  set changeSheduleEvent(value: boolean){
    this._scheduleEvent = value;
  }

  back(){
    this.stepService.changeStepValue(2);
    this.router.navigateByUrl('/eventos/service')
  }

  regresar(){
    this.changeSheduleEvent = false;
    this.stepService.changeStepValue(3);
  }

  submit(){
    this.stepService.changeStepValue(4);
    this.changeSheduleEvent = true;
  }
}
