import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { PrimeModule } from 'src/app/modules/primeng/prime.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EmployeesRouterModule } from './employees-router.module';
import { HomeEmployeesComponent } from './pages/home/home.component';
import { EmployeeComponent } from './pages/employee/employee.component';




@NgModule({
  declarations: [
    HomeEmployeesComponent,
    FuncionariosComponent,
    EmployeeComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimeModule,
    FormsModule,
    EmployeesRouterModule
  ]
})
export class EmployeesModule { }
