import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AulaEnCursoEstudiante} from '../../models/AulaEnCursoEstudiante';

@Injectable({
  providedIn: 'root'
})
export class AulaEnCursoEstudianteService {

  constructor(private httpClient: HttpClient) { }

  listar(anioAulaId: string): Observable<AulaEnCursoEstudiante[]>{
    return this.httpClient.get<AulaEnCursoEstudiante[]>(`${environment.API_URL}/api/aula_en_curso_estudiantes/${anioAulaId}`);
  }

  registrar(aulaEnCursoEstudiante: AulaEnCursoEstudiante){
    return this.httpClient.post(`${environment.API_URL}/api/aula_en_curso_estudiantes`, aulaEnCursoEstudiante);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/aulas_en_curso/${id}`)
  }

  actualizarEstado(id: number, aulaEnCursoEstudiante: AulaEnCursoEstudiante): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/aulas_en_curso/${id}`, aulaEnCursoEstudiante)
  }
}
