import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sesion } from '@models/Sesion';
import { SesionInforme } from '@models/SesionInforme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  constructor(private httpClient: HttpClient) { }

  listar(area_aula_anio_id: number): Observable<Sesion[]>{
    return this.httpClient.get<Sesion[]>(`${environment.API_URL}/api/sesiones/${area_aula_anio_id}`);
  }

  obtenerSesionActual(area_aula_anio_id: number): Observable<Sesion>{
    return this.httpClient
    .get<Sesion>(`${environment.API_URL}/api/sesiones/sesion_actual/${area_aula_anio_id}`);
  }

  listarSesionesFecha(fehaInicio: string, fechaFin: String): Observable<SesionInforme[]>{
    let obj: Object = {
      fecha_inicio: fehaInicio,
      fecha_fin: fechaFin
    }
    return this.httpClient.get<SesionInforme[]>(`${environment.API_URL}/api/sesiones/informe/`+JSON.stringify(obj));
  }

  registrar(obj: Sesion){
    return this.httpClient.post(`${environment.API_URL}/api/sesiones`, obj);
  }

  buscar(id: number): Observable<Sesion>{
    return this.httpClient.delete(`${environment.API_URL}/api/sesiones/${id}`);
  }

  actualizar(obj: Sesion){
    return this.httpClient.put(`${environment.API_URL}/api/sesiones/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/sesiones/${id}`)
  }

  actualizarEstado(id: number, obj: Sesion): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/sesiones/${id}`, obj)
  }
}
