import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
// import { FuncionariosComponent } from './pages/funcionarios/funcionarios.component';

const routes:Routes = [
  {
    path:'eventos-list',
    component: ListadoComponent
  },
  {
    path: 'funcionarios',
    loadChildren: () => import('./pages/employees/employees.module').then(a => a.EmployeesModule)
  },
  {
    path: '**',
    redirectTo: 'eventos-list'
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
export class AdminRouterModule { }
