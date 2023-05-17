import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanActivateChild{


  constructor(
    private authService: AuthService,
    private router: Router
  ){ }


  canActivateChild(): Observable<boolean> | boolean {
    if( this.authService.verifyIsUserLogin())
      return true
    
    this.router.navigate(['/auth/'])
    return false;
  }

  canLoad( route: Route): Observable<boolean> |  boolean {
    // if(!this.authService.isLogin){
    //   this.router.navigate(['/auth']);
    //   return false;
    // }
    return true;
  }

}
