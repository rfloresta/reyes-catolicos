import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { FlujoService } from '@services/flujo.service';

@Injectable({
  providedIn: 'root'
})


export class IsAdminGuard implements CanActivate {
  usuario: UsuarioResponse;
    tipo: number;
    constructor(private flujoService: FlujoService, private router: Router){}
   
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
