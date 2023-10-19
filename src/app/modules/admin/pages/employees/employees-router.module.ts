import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';
import { HomeEmployeesComponent } from './pages/home/home.component';
import { EmployeeComponent } from './pages/employee/employee.component';

const routes:Routes = [
    {
        path: '',
        component: HomeEmployeesComponent,
        children: [
            {
                path: '',
                component: FuncionariosComponent
            },
            {
                path: 'funcionario',
                component: EmployeeComponent
            }
        ]
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class EmployeesRouterModule { }
