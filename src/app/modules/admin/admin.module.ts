import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminRouterModule } from './admin-router.module';
import { ListadoComponent } from './pages/listado/listado.component';
import { PrimeModule } from '../primeng/prime.module';
import { HttpClientModule } from '@angular/common/http';
import { DatesPipe } from './pipes/dates.pipe';
import { TipoPipe } from './pipes/tipo.pipe';
import { NgxSpinnerModule } from "ngx-spinner";
import { FormsModule } from '@angular/forms';
import { EmployeesModule } from './pages/employees/employees.module';

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ListadoComponent,
    DatesPipe,
    TipoPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRouterModule,
    PrimeModule,
    HttpClientModule,
    NgxSpinnerModule,
    FormsModule,
    EmployeesModule
  ]
})
export class AdminModule { }
