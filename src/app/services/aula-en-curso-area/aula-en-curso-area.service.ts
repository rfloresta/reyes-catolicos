import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AulaEnCursoArea } from '../../models/AulaEnCursoArea';

@Injectable({
  providedIn: 'root'
})
export class AulaEnCursoAreaService {

  constructor(private httpClient: HttpClient) { }

  listar(anioAulaId: string): Observable<AulaEnCursoArea[]>{
    return this.httpClient.get<AulaEnCursoArea[]>(`${environment.API_URL}/api/aula_en_curso_areas/${anioAulaId}`);
  }

  registrar(aulaEnCursoArea: AulaEnCursoArea){
    return this.httpClient.post(`${environment.API_URL}/api/aulas_en_curso`, aulaEnCursoArea);
  }

  buscar(id: string): Observable<AulaEnCursoArea>{
    return this.httpClient.get(`${environment.API_URL}/api/aula_en_curso_areas/${id}`);
  }

  actualizar(aulaEnCursoArea: AulaEnCursoArea){
    return this.httpClient.put(`${environment.API_URL}/api/aula_en_curso_areas/${aulaEnCursoArea.id}`, aulaEnCursoArea);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/aula_en_curso_areas/${id}`)
  }

  actualizarEstado(id: number, aulaEnCursoArea: AulaEnCursoArea): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/aula_en_curso_areas/${id}`, aulaEnCursoArea)
  }

  actualizarLink(id: number, aulaEnCursoArea: AulaEnCursoArea): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/aula_en_curso_areas/link/${id}`, aulaEnCursoArea)
  }
}
