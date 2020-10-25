import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/usuarios`);
  }

  listarEstudiantes(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/usuarios/estudiantes`);
  }

  listarProfesores(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/usuarios/profesores`);
  }

  listarEstudiantesSinAula(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/usuarios/estudiantes-sin-aula`);
  }

  registrar(Usuario: Usuario){
    return this.httpClient.post(`${environment.API_URL}/usuarios`, Usuario);
  }

  buscar(id: number): Observable<Usuario>{
    return this.httpClient.get(`${environment.API_URL}/usuarios/${id}`);
  }

  actualizar(Usuario: Usuario){
    return this.httpClient.put(`${environment.API_URL}/usuarios/${Usuario.id}`, Usuario);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/usuarios/${id}`)
  }

  actualizarEstado(id: number, Usuario: Usuario): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/usuarios/${id}`, Usuario)
  }
}
