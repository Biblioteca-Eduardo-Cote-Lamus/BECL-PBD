import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private _currentStep: BehaviorSubject<number> = new BehaviorSubject(1);
  private routes = [['/eventos/personal-info'], ['/eventos/service'],['/eventos/event']];

  constructor(
    private router: Router
  ) { }

  get currentStep() {
    return this._currentStep;
  }

  /**
   * Método para avanzar entre los steps de la reserva 
   * @param step paso al que se desea avanzar
   */
  public changeStepValue(step: number){
    this._currentStep.next(step);
    this.saveCurrentStep(step);
    this.goToCurrentStep(step);
  }

  /**
   * Método para avanzar entre los steps de la reserva 
   * @param step paso al que se desea avanzar
   */
  private goToCurrentStep(step: number){    
    if(step < 4)
      this.router.navigate(this.routes[step-1]);
  }

  /**
   * Método para guardar en el localStorage el paso en el que quedamos.
   * @param step paso que se desea guardar
   */
  private saveCurrentStep(step: number){
    if(step < 4){
      // Guardo el estado actual del step
      localStorage.setItem('step', `${step}`);
    }
  }

}
