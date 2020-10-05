import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seccion } from '@models/Seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Seccion[]>{
    return this.httpClient.get<Seccion[]>(`${environment.API_URL}/secciones`);
  }

  registrar(Seccion: Seccion){
    return this.httpClient.post(`${environment.API_URL}/secciones`, Seccion);
  }

  buscar(id: number): Observable<Seccion>{
    return this.httpClient.delete(`${environment.API_URL}/secciones/${id}`);
  }

  actualizar(Seccion: Seccion){
    return this.httpClient.put(`${environment.API_URL}/secciones/${Seccion.id}`, Seccion);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/secciones/${id}`)
  }

  actualizarEstado(id: number, Seccion: Seccion): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/secciones/${id}`, Seccion)
  }
}
