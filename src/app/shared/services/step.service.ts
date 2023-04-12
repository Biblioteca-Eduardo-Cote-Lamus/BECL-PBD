import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

   currentStep: BehaviorSubject<number> = new BehaviorSubject(1);

  constructor() { }

  changeStepValue(step: number){
    this.currentStep.next(step);
  }

}
