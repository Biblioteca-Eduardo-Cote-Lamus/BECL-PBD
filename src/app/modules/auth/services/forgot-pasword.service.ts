import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from 'src/app/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ForgotPaswordService {

  private _baseUrl = enviroment.baseUrlLocal;

  constructor(
    private http: HttpClient
  ) { }


  public validateEmail({email}: {email:string}){
    return this.http.post(`${enviroment.productionUrl}forgot_password/`, {email})
  }

  public validateCode({token, codeVery}: {token: string, codeVery: string}) {
    return this.http.post(`${enviroment.productionUrl}valid_code/`, {token, codeVery})
  }

  public updatePassword({token, email, password}:{token: string, email:string ,password: string}){
    return this.http.post(`${enviroment.productionUrl}reset_password/`, {token,email, password})
  }


}
