import { Component, OnDestroy, OnInit } from '@angular/core';
import { IStep } from 'src/app/data/interfaces/step-item.interface';
import { StepService } from '../../../../shared/services/step.service';
import { Router, RouterModule } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'app-step-container',
  templateUrl: './step-container.component.html',
  styleUrls: ['./step-container.component.css']
})
export class StepContainerComponent implements OnInit{

  stepItems: IStep[] = [
    {
      step: 1,
      title: 'Información Personal'
    },
    {
      step: 2,
      title: 'Seleccionar Servicio'
    },
    {
      step: 3,
      title: 'Datos del evento'
    },
    {
      step: 4,
      title: 'Resumen'
    }
  ];

  currentStep = 1;
  routes = [['/eventos/personal-info'], ['/eventos/service'],['/eventos/event']]
  constructor(
    private stepService: StepService,
    private router: Router
  ){ }


  ngOnInit(): void {
    
    //Pregunto si ya se guardo el step y lo leo  
    // this.currentStep = localStorage.getItem('step') ? 
    
    this.currentStep = localStorage.getItem('step') ? JSON.parse(localStorage.getItem('step')!).step : 1;
    //me suscribo al cambio de paso para que se renderice
    this.stepService.changeStepValue(this.currentStep);
    // this.stepService.currentStep.subscribe({
    //     next: step => {
    //       this.currentStep = step;
    //       console.log(this.currentStep);
    //       this.saveCurrentStep();
    //       this.goToCurrentStep();
    //     }
    // })

    this.stepService.currentStep.pipe(
      tap(step => {
        this.currentStep = step;
        this.saveCurrentStep();
        this.goToCurrentStep();
      })
    ).subscribe();
  }
  

  saveCurrentStep(){
    // Guardo el estado actual del step
    localStorage.setItem('step', JSON.stringify({step: this.currentStep}));
  }

  goToCurrentStep(){    
    this.router.navigate(this.routes[this.currentStep-1]);
  }

}
