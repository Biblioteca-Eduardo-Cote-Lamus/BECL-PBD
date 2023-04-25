import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepContainerComponent } from './pages/step-container/step-container.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { StepRoutingModule } from './step-routing.module';
import { ServiceComponent } from './pages/service/service.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventComponent } from './pages/event/event.component';
import { PrimeModule } from '../primeng/prime.module';



@NgModule({
  declarations: [
    StepContainerComponent,
    PersonalInfoComponent,
    ServiceComponent,
    EventComponent
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    StepRoutingModule,
    PrimeModule
  ]
})
export class StepsFormModule { }
