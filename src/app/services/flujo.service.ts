import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlujoService {

  readonly enviarObjetoSource: BehaviorSubject<Object> = new BehaviorSubject(Object);
  readonly enviarObjeto$ = this.enviarObjetoSource.asObservable();

   enviarObjeto(objeto: Object): void{
    this.enviarObjetoSource.next(objeto);
  }

  readonly enviarAccionSource: BehaviorSubject<string> = new BehaviorSubject("Registrar");
  readonly enviarAccion$ = this.enviarAccionSource.asObservable();

   enviarAccion(accion: string): void{
    this.enviarAccionSource.next(accion);
  }

  readonly logeadoSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly logeado$ = this.logeadoSource.asObservable();

   logeado(bool: boolean): void{
    this.logeadoSource.next(bool);
  }
  
  constructor() { }
}
