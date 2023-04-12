import { Component, OnInit } from '@angular/core';
import { IStep } from 'src/app/data/interfaces/step-item.interface';
import { StepService } from '../../../../shared/services/step.service';

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

  currentStep = 0;

  constructor(
    private stepService: StepService
  ){ }

  ngOnInit(): void {
    this.stepService.changeStepValue(1);
    this.stepService.currentStep.subscribe({
        next: step => {
          this.currentStep = step;
        }
    })
  }
  


}
