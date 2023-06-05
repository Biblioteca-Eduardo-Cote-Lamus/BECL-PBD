import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { RouterModule } from '@angular/router';
import { AdminRouterModule } from './admin-router.module';
import { ListadoComponent } from './pages/listado/listado.component';



@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    ListadoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AdminRouterModule
  ]
})
export class AdminModule { }
