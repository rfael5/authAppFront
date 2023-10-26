import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovaSenha } from './novaSenha';
import { NovoUsuario } from './novoUsuario';
import { Router } from '@angular/router';
import { SessaoUsuario } from './sessaoUsuario';
import { Login } from './login';
import { Usuario } from './usuario';
import { ServiceResponse } from './serviceResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  url:string = "https://localhost:7230/api/Auth/"

  usuarioAutenticado:any;

  sessaoUsuario!:SessaoUsuario;

  constructor(private http:HttpClient, private router:Router) { }

  getWeather():Observable<any>{
    return this.http.get<any>(`https://localhost:7230/WeatherForecast`);
  }

  login(userLogin:Login):Observable<any>{
    return this.http.post<SessaoUsuario>(`${this.url}login`, userLogin)
  }

  cadastrar(novoUsuario:NovoUsuario):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(`${this.url}cadastrar`, novoUsuario);
  }

  getUserToken(){
    let token = localStorage.getItem('jwtToken')
    if(token){
      this.usuarioAutenticado = JSON.parse(atob(token?.split('.')[1]));
      return this.usuarioAutenticado;
    }else{
      return null;
    }  
  }

  mudarSenha(novaSenha:NovaSenha):Observable<ServiceResponse>{
    return this.http.post<ServiceResponse>(`${this.url}mudar-senha`, novaSenha);
  }

  buscarUsuario(userId:number):Observable<ServiceResponse>{
    return this.http.get<ServiceResponse>(`${this.url}buscar-usuario/${userId}`)
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  validarSessao():boolean{
    let token = localStorage.getItem('jwtToken');

    if(token){
      return true;
    }else{
      return false;
    }
  }
}
