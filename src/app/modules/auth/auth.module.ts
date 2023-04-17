import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { AuthRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeModule } from '../primeng/prime.module'
import { HttpClientModule } from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    SignInComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    PrimeModule,
    HttpClientModule,
  ]
})
export class AuthModule { }
