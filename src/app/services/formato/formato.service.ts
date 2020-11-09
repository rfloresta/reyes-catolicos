import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formato } from '@models/Formato';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormatoService {

  constructor(private httpClient: HttpClient) { }

  listar(tipo_recurso_id: string): Observable<Formato[]>{
    return this.httpClient.get<Formato[]>(`${environment.API_URL}/api/formatos/${tipo_recurso_id}`);
  }

  registrar(obj: Formato){
    return this.httpClient.post(`${environment.API_URL}/api/formatoes`, obj);
  }

  buscar(id: number): Observable<Formato>{
    return this.httpClient.delete(`${environment.API_URL}/api/formatoes/${id}`);
  }

  actualizar(obj: Formato){
    return this.httpClient.put(`${environment.API_URL}/api/formatoes/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/formatoes/${id}`)
  }

  actualizarEstado(id: number, obj: Formato): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/formatoes/${id}`, obj)
  }
}
