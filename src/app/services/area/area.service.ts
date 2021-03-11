import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Area } from '@models/Area';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Area[]>{
    return this.httpClient.get<Area[]>(`${environment.API_URL}/api/areas`);
  }

  registrar(form: FormData){
    return this.httpClient.post(`${environment.API_URL}/api/areas`, form);
  }

  buscar(id: number): Observable<Area>{
    return this.httpClient.delete(`${environment.API_URL}/api/areas/${id}`);
  }

  actualizar(form: FormData){
    console.log(form.get('nombre'));
    
    return this.httpClient.put(`${environment.API_URL}/api/areas/${form.get('id')}`, form);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/areas/${id}`)
  }

  actualizarEstado(id: number, area: Area): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/areas/${id}`, area)
  }
}
  