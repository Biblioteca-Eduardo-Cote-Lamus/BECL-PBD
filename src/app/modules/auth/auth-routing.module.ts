import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { ForgotPComponent } from './pages/forgot-p/forgot-p.component';

const routes: Routes = [

  {
    path: 'inicio-sesion',
    component: SignInComponent
  },
   {
    path: 'recuperar',
    component: ForgotPComponent
   },
   {
    path:'**',
    redirectTo:'inicio-sesion'
  },
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [  
    RouterModule
  ]
})
export class AuthRoutingModule { }
