import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements  CanLoad{


  constructor(
    private authService: AuthService,
    private router: Router
  ){ }

  
  canLoad( route: Route): Observable<boolean> |  boolean {
    if(!this.authService.isLogin){
      this.router.navigate(['/auth']);
      return false;
    }
    return true;
  }

}
