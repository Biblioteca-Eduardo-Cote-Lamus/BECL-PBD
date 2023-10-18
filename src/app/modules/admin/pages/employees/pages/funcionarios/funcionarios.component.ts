import { Component, OnInit } from '@angular/core';
import { EventoUsuario } from 'src/app/data/interfaces/eventos.interface';
import { FuncionarioService } from '../../../../services/funcionario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.component.html',
  styleUrls: ['./funcionarios.component.css']
})
export class FuncionariosComponent implements OnInit{

  managers: EventoUsuario[]
  selectedManager!: any;

  constructor(
    private funcionariosService: FuncionarioService,
    private router: Router
  ) {
    this.managers = []
  }

  ngOnInit(): void {
    this.funcionariosService.getAllManagers().subscribe(
      {
        next: (res:any) => {
          this.managers = res;  
        }
      }
    )
  }
 
  selectManager(event: any) {
    console.log(event);
    
  }

  goToEmployee() {

    this.router.navigateByUrl(`/admin/funcionarios/funcionario?new=true`)

  }

  goToEditEmployee(username:string){
    this.router.navigateByUrl(`/admin/funcionarios/funcionario?edit=true&username=${username}`)
  }

  algo(){
    alert('hola')
  }

}
