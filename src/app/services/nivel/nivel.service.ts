import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nivel } from '@models/Nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Nivel[]>{
    return this.httpClient.get<Nivel[]>(`${environment.API_URL}/niveles`);
  }

  registrar(Nivel: Nivel){
    return this.httpClient.post(`${environment.API_URL}/niveles`, Nivel);
  }

  buscar(id: number): Observable<Nivel>{
    return this.httpClient.delete(`${environment.API_URL}/niveles/${id}`);
  }

  actualizar(Nivel: Nivel){
    return this.httpClient.put(`${environment.API_URL}/niveles/${Nivel.id}`, Nivel);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/niveles/${id}`)
  }

  actualizarEstado(id: number, Nivel: Nivel): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/niveles/${id}`, Nivel)
  }
}
