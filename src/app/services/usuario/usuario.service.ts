import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CambioPassword } from '@models/CambioPassword';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/api/usuarios`);
  }

  listarEstudiantes(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/api/usuarios/estudiantes`);
  }


  listarProfesores(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/api/usuarios/profesores-sin-aula`);
  }

  listarEstudiantesSinAula(): Observable<Usuario[]>{
    return this.httpClient.get<Usuario[]>(`${environment.API_URL}/api/usuarios/estudiantes-sin-aula`);
  }

  registrar(form: FormData){
    return this.httpClient.post(`${environment.API_URL}/api/usuarios`, form);
  }

  buscar(id: number): Observable<Usuario>{
    return this.httpClient.get(`${environment.API_URL}/api/usuarios/${id}`);
  }

  actualizar(form: FormData){
    return this.httpClient.put(`${environment.API_URL}/api/usuarios/${form.get('id')}`, form);
  }

  cambiarPassword(id:number, password: CambioPassword){
    return this.httpClient.patch(`${environment.API_URL}/api/usuarios/${id}/cambio-password`, password);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/usuarios/${id}`)
  }

  actualizarEstado(id: number, Usuario: Usuario): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/usuarios/${id}`, Usuario)
  }
}
