import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Token } from 'src/app/data/interfaces/token.interface';
import { Usuario } from 'src/app/data/interfaces/usuario.interface';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //Observables para manejar el usuario actual
  private currentUserBehavior!:BehaviorSubject<Usuario>;
  private currentUserObservable!: Observable<Usuario>;
  private _isLogin: boolean = false;

  private jwtHelper: JwtHelperService

  //Varible para guardar el token
  private token: string = '';

  //variable para peticiones al backend de autenticacion
  private baseUrl = enviroment.baseUrlAuhtLocal;

  constructor(
    private http: HttpClient
  ) { 
    this.jwtHelper = new JwtHelperService();
    this.currentUserBehavior = new BehaviorSubject<Usuario>({} as Usuario);
  }

  get getcurrentUserObservable () {
    return this.currentUserObservable;
  }

    //método para manejar el inicio de sesión. 
  login(username: string, password: string): Observable<Token>{
    return this.http.post<Token>(this.baseUrl+"login/", { username, password }).pipe(
      tap( (res:Token) => {
        //obtengo el token de la respuesta 
        this.token = res.token;
        //si no son las credenciales o hay un error, se mantiene el usuario vacio
        if(! res.ok){
          this.currentUserBehavior.next({} as Usuario);
          return;
        }
        //Caso contrario se crea el objeto
        this.currentUserBehavior.next(this.jwtHelper.decodeToken(this.token)!);
        this.currentUserObservable = this.currentUserBehavior.asObservable();
        this._isLogin = true;
        //guardo en el localstorage 
        this.saveOnLocalStorage(this.jwtHelper.decodeToken(this.token)!);
      }),
    );
  }

  //Método para menejar el cierre de sesión.
  logout(){

  }

  get isLogin(){
    return this._isLogin
  }

  private saveOnLocalStorage(user: Usuario){
    localStorage.setItem('user', JSON.stringify(user));
  }
}
