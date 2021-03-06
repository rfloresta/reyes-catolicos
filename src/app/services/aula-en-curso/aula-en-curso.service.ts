import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '@models/Usuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AulaEnCurso } from '../../models/AulaEnCurso';

@Injectable({
  providedIn: 'root'
})
export class AulaEnCursoService {

  constructor(private httpClient: HttpClient) { }

  listar(anioId: number): Observable<AulaEnCurso[]>{
    return this.httpClient.get<AulaEnCurso[]>(`${environment.API_URL}/api/aulas_en_curso/anios/${anioId}`);
  }

  obtenerId(usuarioId: number): Observable<AulaEnCurso>{
    return this.httpClient.get<AulaEnCurso>(`${environment.API_URL}/api/aulas_en_curso/id/${usuarioId}`);
  }

  obtenerCantidadUsuarioEnCurso(anio_id: number, tipo_id: number): Observable<number>{
    return this.httpClient.get<number>(`${environment.API_URL}/api/aulas_en_curso/usuarios/en-curso/${anio_id}/${tipo_id}`);
  }

  obtenerCantidadArchivos(): Observable<number>{
    return this.httpClient.get<number>(`${environment.API_URL}/api/aulas_en_curso/cantidad-archivos`);
  }

  registrar(aulaEnCurso: AulaEnCurso){
    return this.httpClient.post(`${environment.API_URL}/api/aulas_en_curso`, aulaEnCurso);
  }

  buscar(id: string): Observable<AulaEnCurso>{
    return this.httpClient.get(`${environment.API_URL}/api/aulas_en_curso/${id}`);
  }

  actualizar(aulaEnCurso: AulaEnCurso){
    return this.httpClient.put(`${environment.API_URL}/api/aulas_en_curso/${aulaEnCurso.id}`, aulaEnCurso);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/aulas_en_curso/${id}`)
  }

  actualizarEstado(id: number, aulaEnCurso: AulaEnCurso): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/aulas_en_curso/${id}`, aulaEnCurso)
  }
}
