import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlujoService {

  //Objeto que se cargaran en los formularios 
  readonly enviarObjetoSource: BehaviorSubject<Object> = new BehaviorSubject(Object);
  readonly enviarObjeto$ = this.enviarObjetoSource.asObservable();

   enviarObjeto(objeto: Object): void{
    this.enviarObjetoSource.next(objeto);
  }

  //Accion de Formulario Registrar/Actualizar
  readonly enviarAccionSource: BehaviorSubject<string> = new BehaviorSubject("Registrar");
  readonly enviarAccion$ = this.enviarAccionSource.asObservable();

   enviarAccion(accion: string): void{
    this.enviarAccionSource.next(accion);
  }

  //login
  readonly logeadoSource: BehaviorSubject<boolean> = new BehaviorSubject(false);
  readonly logeado$ = this.logeadoSource.asObservable();

   logeado(bool: boolean): void{
    this.logeadoSource.next(bool);
  }

  readonly tipoSource: BehaviorSubject<number> = new BehaviorSubject(0);
  readonly tipo$ = this.tipoSource.asObservable();

   enviarTipo(tipo: number): void{
    this.tipoSource.next(tipo);
  }

   // private tipo$ = new Subject<number>();

  //  enviarTipo(tipo: number): void{
  //    this.tipo$.next(tipo);
  // }

  // getTipo$(): Observable<number> {
  //   return this.tipo$.asObservable();
  // }
  
  //Mostrar/Ocultar 
  readonly enviarBoolSource: Subject<boolean> = new Subject();
  readonly enviarBool$ = this.enviarBoolSource.asObservable();

   enviarBool(bool: boolean): void{
    this.enviarBoolSource.next(bool);
  }

  $itemValue = new BehaviorSubject(this.theItem);

 set theItem(value) {
   this.$itemValue.next(value); // this will make sure to tell every subscriber about the change.
   
   localStorage.setItem('sesion', value);
 }

 get theItem() {
   return localStorage.getItem('sesion');
 }

  constructor() { }
}
