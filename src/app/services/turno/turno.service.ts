import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '@models/Turno';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Turno[]>{
    return this.httpClient.get<Turno[]>(`${environment.API_URL}/api/turnos`);
  }

  registrar(turno: Turno){
    return this.httpClient.post(`${environment.API_URL}/api/turnos`, turno);
  }

  buscar(id: number): Observable<Turno>{
    return this.httpClient.delete(`${environment.API_URL}/api/turnos/${id}`);
  }

  actualizar(turno: Turno){
    return this.httpClient.put(`${environment.API_URL}/api/turnos/${turno.id}`, turno);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/turnos/${id}`)
  }

  actualizarEstado(id: number, Turno: Turno): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/turnos/${id}`, Turno)
  }
}
