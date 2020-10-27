import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recurso } from '@models/recurso';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  readonly enviarRecursoSource: BehaviorSubject<Recurso[]> = new BehaviorSubject(null);
  readonly enviarRecurso$ = this.enviarRecursoSource.asObservable();

   enviarRecursos(recurso: Recurso[]): void{
    this.enviarRecursoSource.next(recurso);
  }


  constructor(private httpClient: HttpClient) {

    
   }

  listar(sesion_id: number): Observable<Recurso[]>{
    return this.httpClient.get<Recurso[]>(`${environment.API_URL}/recursos/${sesion_id}`);
  }

  registrar(obj: Recurso){
    return this.httpClient.post(`${environment.API_URL}/recursos`, obj);
  }

  buscar(id: number): Observable<Recurso>{
    return this.httpClient.delete(`${environment.API_URL}/recursos/${id}`);
  }

  actualizar(obj: Recurso){
    return this.httpClient.put(`${environment.API_URL}/recursos/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/recursos/${id}`)
  }

  actualizarEstado(id: number, obj: Recurso): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/recursos/${id}`, obj)
  }
}
