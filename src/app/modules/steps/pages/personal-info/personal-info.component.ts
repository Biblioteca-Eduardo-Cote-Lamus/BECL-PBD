import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css']
})
export class PersonalInfoComponent {


  constructor(
    private router: Router,
    private stepService: StepService  
  ){}

  submit(){
    this.stepService.changeStepValue(2);
    this.router.navigateByUrl('eventos/service')
  }
}
