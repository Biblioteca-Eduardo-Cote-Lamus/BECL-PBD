import { Component, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StepService } from 'src/app/shared/services/step.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent {

  myForm!: FormGroup;
  service: string = '';

  constructor(
    private router: Router,
    private stepService: StepService ,
    private fb: FormBuilder
  )
  {
      this.myForm = this.fb.group({
        service: [, [Validators.required] ],
        loan: [, [Validators.required] ]
      });

      this.myForm.valueChanges.subscribe(value => {
        this.service = value.service
      })

    
   }

  changeStep(step: number){
    this.stepService.changeStepValue(step);
  }

  submit(){

    //si no se ha seleccionado ningún servicio y se le da al botón de enviar, cancelar al redirección. 
    if(!this.myForm.controls['service']?.value)
      return 

    //si se selecciono el servicio de prestamo, pero no se selecciono el espacio se le da al botón de enviar, cancelar al redirección. 
    if(this.myForm.controls['service']?.value === 'prestamo' && !this.myForm.controls['loan'].value)
      return 
    
    this.stepService.changeStepValue(3)
    this.router.navigateByUrl('/eventos/event')
  }

  checkedState(value: string){
    return this.myForm.controls['service']!.value === value || this.myForm.controls['loan']!.value === value
  }
  changeService(){
    this.service = ''
    this.myForm.get('service')?.setValue(null , {emitValue: false} )
  }
}
