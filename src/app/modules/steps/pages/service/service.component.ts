import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {


  constructor(
    private router: Router,
    private stepService: StepService  
  ){ }

  submit(){
    this.stepService.changeStepValue(1);
    this.router.navigateByUrl('eventos/personal-info');
  }
}
