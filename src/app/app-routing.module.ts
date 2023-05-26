import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanLoad } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(a => a.AuthModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'eventos',
    loadChildren: () => import('./modules/steps/steps-form.module').then(a => a.StepsFormModule),
  },
  {
    path: '**',
    redirectTo:'auth'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
