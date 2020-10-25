import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { LoginService } from '@services/auth/login.service';
import { FlujoService } from '@services/flujo.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class IsAdminGuard implements CanActivate, CanActivateChild, CanLoad {
  usuario: UsuarioResponse;
    tipo: number;
    constructor(private flujoService: FlujoService, private router: Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.flujoService.enviarBool$.pipe(
      map((data:boolean)=>{
        console.log("DATOSSSSSSSSSSSSSSSSS",data);
        if(data){
          this.router.navigate(["principal/dashboard"]);
        }else{
          this.router.navigate(["principal/inicio"]);
        }
        return data;
      })
    );
  }
  
  canActivateChild(): Observable<boolean>{
    return this.flujoService.enviarBool$.pipe(
      map((data:boolean)=>{
        console.log("DATOSSSSSSSSSSSSSSSSS",data);
        if(data){
          this.router.navigate(["principal/dashboard"]);
        }else{
          this.router.navigate(["principal/inicio"]);
        }
        return data;
      })
    );
  }
   
    canActivate(): boolean{
      let usuarioString = localStorage.getItem('usuario');
      this.usuario = JSON.parse(usuarioString);
      this.tipo = this.usuario.tipo;
        if(this.tipo===3 || this.tipo===4){
          this.router.navigate(["principal/inicio"]);
          return false;
        }
        return true;
  }

}
