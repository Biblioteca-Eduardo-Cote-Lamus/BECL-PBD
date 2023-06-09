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
import { StatesPipe } from './pipes/states.pipe';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ListadoComponent,
    DatesPipe,
    TipoPipe,
    StatesPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRouterModule,
    PrimeModule,
    HttpClientModule
  ]
})
export class AdminModule { }
