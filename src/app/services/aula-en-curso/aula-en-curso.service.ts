import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AulaEnCurso } from '../../models/AulaEnCurso';

@Injectable({
  providedIn: 'root'
})
export class AulaEnCursoService {

  constructor(private httpClient: HttpClient) { }

  listar(anioId: number): Observable<AulaEnCurso[]>{
    return this.httpClient.get<AulaEnCurso[]>(`${environment.API_URL}/aulas_en_curso/${anioId}`);
  }

  registrar(aulaEnCurso: AulaEnCurso){
    return this.httpClient.post(`${environment.API_URL}/aulas_en_curso`, aulaEnCurso);
  }

  buscar(id: number): Observable<AulaEnCurso>{
    return this.httpClient.delete(`${environment.API_URL}/aulas_en_curso/${id}`);
  }

  actualizar(aulaEnCurso: AulaEnCurso){
    return this.httpClient.put(`${environment.API_URL}/aulas_en_curso/${aulaEnCurso.id}`, aulaEnCurso);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/aulas_en_curso/${id}`)
  }

  actualizarEstado(id: number, aulaEnCurso: AulaEnCurso): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/aulas_en_curso/${id}`, aulaEnCurso)
  }
}
