import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Usuario, UsuarioResponse } from 'src/app/models/Usuario';
import { environment } from "../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { FlujoService } from '../flujo.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: Usuario;
  tipo: number;
  constructor(private httpClient: HttpClient, 
    private router: Router, 
    private flujoService: FlujoService,
    private anioEscolarService: AnioEscolarService) {
    this.verificarToken();
       }
   
  login(Usuario: Usuario): Observable<UsuarioResponse | void >{
    return this.httpClient
    .post<UsuarioResponse>(`${environment.API_URL}/api/login`, Usuario)
    .pipe( 
      map((res: UsuarioResponse) => {
        this.guardarLocalStorage(res);
        this.flujoService.logeado(true);
        return res;
      })
    );
    
  }


  logout():void {
    localStorage.removeItem('usuario');
    localStorage.removeItem('anio_activo');
    localStorage.removeItem('sesion');
    localStorage.removeItem('area');
    localStorage.removeItem('areas');
    localStorage.removeItem('nuevoNumero');
    localStorage.removeItem('numeroMayor');
    localStorage.removeItem('ai');
    this.flujoService.logeado(false);
    setTimeout(() => {
      this.router.navigate(["/login"]);

    }, 2);

  }

   verificarToken(): void{
    let usuario: UsuarioResponse=JSON.parse(localStorage.getItem("usuario")) || null;
    if(usuario){
      let expirado =  helper.isTokenExpired(usuario.token);
      if(expirado){
        this.logout();
      }else{
        this.flujoService.logeado(true);
      }
    }
    // set usuarioLogeado
  }

  private guardarLocalStorage(usuario: UsuarioResponse): void{
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  private handelError(err): Observable<never> {
    let errorMessage = "Ha ocurrido un error";
    if(err){
      errorMessage = `Error: codigo ${err.message}`;
    }
    return throwError(errorMessage);
  }

}
