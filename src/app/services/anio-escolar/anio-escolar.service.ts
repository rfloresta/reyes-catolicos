import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AnioEscolar } from '@models/AnioEscolar';

@Injectable({
  providedIn: 'root'
})
export class AnioEscolarService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<AnioEscolar[]>{
    return this.httpClient.get<AnioEscolar[]>(`${environment.API_URL}/api/anios`);
  }

  obtenerAnioActivo(): Observable<AnioEscolar>{
    return this.httpClient.get<AnioEscolar>(`${environment.API_URL}/api/anios/activo`);
  }

  registrar(anioEscolar: AnioEscolar){
    return this.httpClient.post(`${environment.API_URL}/api/anios`, anioEscolar);
  }

  buscar(id: number): Observable<AnioEscolar>{
    return this.httpClient.delete(`${environment.API_URL}/api/anios/${id}`);
  }

  actualizar(anioEscolar: AnioEscolar){
    return this.httpClient.put(`${environment.API_URL}/api/anios/${anioEscolar.id}`, anioEscolar);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/anios/${id}`)
  }

  actualizarEstado(id: number, anioEscolar: AnioEscolar): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/anios/${id}`, anioEscolar)
  }
}
