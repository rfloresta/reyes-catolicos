import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '@models/actividad';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private httpClient: HttpClient) { }

  listar(sesion_id: number): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(`${environment.API_URL}/actividades/${sesion_id}`);
  }

  registrar(obj: Actividad){
    return this.httpClient.post(`${environment.API_URL}/actividades`, obj);
  }

  buscar(id: number): Observable<Actividad>{
    return this.httpClient.delete(`${environment.API_URL}/actividades/${id}`);
  }

  actualizar(obj: Actividad){
    return this.httpClient.put(`${environment.API_URL}/actividades/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/actividades/${id}`)
  }

  actualizarEstado(id: number, obj: Actividad): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/actividades/${id}`, obj)
  }
}
