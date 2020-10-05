import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Grado } from '@models/Grado';

@Injectable({
  providedIn: 'root'
})
export class GradoService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Grado[]>{
    return this.httpClient.get<Grado[]>(`${environment.API_URL}/grados`);
  }

  registrar(Grado: Grado){
    return this.httpClient.post(`${environment.API_URL}/grados`, Grado);
  }

  buscar(id: number): Observable<Grado>{
    return this.httpClient.delete(`${environment.API_URL}/grados/${id}`);
  }

  actualizar(Grado: Grado){
    return this.httpClient.put(`${environment.API_URL}/grados/${Grado.id}`, Grado);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/grados/${id}`)
  }

  actualizarEstado(id: number, Grado: Grado): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/grados/${id}`, Grado)
  }
}
