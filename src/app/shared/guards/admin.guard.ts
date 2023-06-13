import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  
  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  canActivate(): Observable<boolean> | boolean {
    const {user_rol} = JSON.parse(localStorage.getItem('user')!) || {}

    if( this.authService.verifyIsUserLogin() && user_rol == 'Administrador')
      return true
    
    this.router.navigate(['/auth/'])
    return false;
  }

  
}
