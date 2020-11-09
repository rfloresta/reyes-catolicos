import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aula } from '@models/aula';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Aula[]>{
    return this.httpClient.get<Aula[]>(`${environment.API_URL}/api/gestion-aulas/aulas`);
  }

  registrar(Aula: Aula){
    return this.httpClient.post(`${environment.API_URL}/api/gestion-aulas/aulas`, Aula);
  }

  buscar(id: number): Observable<Aula>{
    return this.httpClient.delete(`${environment.API_URL}/api/gestion-aulas/aulas/${id}`);
  }

  actualizar(Aula: Aula){
    return this.httpClient.put(`${environment.API_URL}/api/gestion-aulas/aulas/${Aula.id}`, Aula);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/gestion-aulas/aulas/${id}`)
  }

  actualizarEstado(id: number, Aula: Aula): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/gestion-aulas/aulas/${id}`, Aula)
  }
}
