import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sesion } from '@models/sesion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private httpClient: HttpClient) { }

  listar(area_aula_anio_id: number): Observable<Sesion[]>{
    return this.httpClient.get<Sesion[]>(`${environment.API_URL}/sesiones/${area_aula_anio_id}`);
  }

  obtenerSesionActual(area_aula_anio_id: number): Observable<Sesion>{
    return this.httpClient
    .get<Sesion>(`${environment.API_URL}/sesiones/sesion_actual/${area_aula_anio_id}`);
  }

  registrar(obj: Sesion){
    return this.httpClient.post(`${environment.API_URL}/sesiones`, obj);
  }

  buscar(id: number): Observable<Sesion>{
    return this.httpClient.delete(`${environment.API_URL}/sesiones/${id}`);
  }

  actualizar(obj: Sesion){
    return this.httpClient.put(`${environment.API_URL}/sesiones/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/sesiones/${id}`)
  }

  actualizarEstado(id: number, obj: Sesion): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/sesiones/${id}`, obj)
  }
}
