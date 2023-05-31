import { Injectable } from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate ,CanActivateChild{


  constructor(
    private authService: AuthService,
    private router: Router
  ){ }


  canActivate(): boolean | Observable<boolean>  {
    
    if( this.authService.verifyIsUserLogin()){
      this.router.navigate(['/eventos/personal-info'])
      return false
    }
      
    
    return true
  }


  canActivateChild(): Observable<boolean> | boolean {
    if( this.authService.verifyIsUserLogin())
      return true
    
    this.router.navigate(['/auth/'])
    return false;
  }

}
