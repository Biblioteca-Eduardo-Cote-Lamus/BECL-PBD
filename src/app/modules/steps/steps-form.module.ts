import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepContainerComponent } from './pages/step-container/step-container.component';
import { PersonalInfoComponent } from './pages/personal-info/personal-info.component';
import { StepRoutingModule } from './step-routing.module';
import { ServiceComponent } from './pages/service/service.component';



@NgModule({
  declarations: [
    StepContainerComponent,
    PersonalInfoComponent,
    ServiceComponent
  ],
  imports: [
    CommonModule,
    StepRoutingModule
  ]
})
export class StepsFormModule { }
