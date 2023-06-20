import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../primeng/prime.module'
import { HttpClientModule } from '@angular/common/http'
import { ForgotPComponent } from './pages/forgot-p/forgot-p.component';

@NgModule({
  declarations: [
    SignInComponent,
    ForgotPComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    HttpClientModule,
    FormsModule
  ]
})
export class AuthModule { }
