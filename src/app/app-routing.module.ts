import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { HomeComponent } from './modules/admin/pages/home/home.component';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(a => a.AuthModule)
  },
  {
    path: 'eventos',
    loadChildren: () => import('./modules/steps/steps-form.module').then(a => a.StepsFormModule),
  },
  {
    path:'admin',
    component: HomeComponent,
    canActivate: [AdminGuard],
    loadChildren: () => import('./modules/admin/admin.module').then(ad => ad.AdminModule),
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
