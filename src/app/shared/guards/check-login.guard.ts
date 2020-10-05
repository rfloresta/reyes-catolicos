import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { LoginService } from 'src/app/services/auth/login.service';
import { FlujoService } from 'src/app/services/flujo.service';
import { routes } from '../default/default-routing.module';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  constructor(private flujoService: FlujoService, private loginService: LoginService){}

  canActivate(): Observable<boolean>{
    this.loginService.verificarToken();
    return this.flujoService.logeado$.pipe(
      map((data:boolean)=>{
        return data
      })
    );
  }
  
}

  

