import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Usuario } from 'src/app/data/interfaces/usuario.interface';
import { enviroment } from 'src/app/environments/environment.development';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Observables para manejar el usuario actual
  private currentUserBehavior!:BehaviorSubject<Usuario>;
  private currentUserObservable!: Observable<Usuario>;
  

  private jwtHelper: JwtHelperService

  //Varible para guardar el token
  private token: string = '';

  //variable para peticiones al backend de autenticacion
  // private baseUrl = enviroment.baseUrlLocal;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { 
    this.jwtHelper = new JwtHelperService();
    this.currentUserBehavior = new BehaviorSubject<Usuario>({} as Usuario);
    this.currentUserObservable = this.currentUserBehavior.asObservable();
  }

  get getcurrentUserObservable () {
    return this.currentUserObservable;
  }

    //método para manejar el inicio de sesión. 
  public login(username: string, password: string){
    return this.http.post(`${enviroment.productionUrl}login/`, { username, password }).pipe(
      tap( (res:any) => {
        
        if(! res.ok){
          this.currentUserBehavior.next({} as Usuario);
          return;
        }

        //obtengo el token de la respuesta y se guarda momentaneamente en el localStorage
        this.token = res.token;
        localStorage.setItem('token', this.token)
        //si no son las credenciales o hay un error, se mantiene el usuario vacio
        //Caso contrario se crea el objeto
        this.currentUserBehavior.next(this.jwtHelper.decodeToken(this.token)!);
        //guardo en el localstorage 
        this.saveOnLocalStorage(this.jwtHelper.decodeToken(this.token)!);
      }),
    );
  }

  //Método para menejar el cierre de sesión.
  public logout(){
    localStorage.clear();
    this.router.navigate(['/auth'])
  }

  public verifyIsUserLogin(){
    // verifico si el token aun está guardado en el LS
    const token = localStorage.getItem('token') ?? ''

    //Se valida si es nulo o si el token ya expiro, se sabe que no sirve y se debe de deslogear
    if(token.length == 0 || this.jwtHelper.isTokenExpired(token))
      return false

    return true
  }

  private saveOnLocalStorage(user: Usuario){
    localStorage.setItem('user', JSON.stringify(user));
  }

  public validateToken(){
    this.token = localStorage.getItem('token')!
    return ! this.jwtHelper.isTokenExpired(this.token);
  }
}
