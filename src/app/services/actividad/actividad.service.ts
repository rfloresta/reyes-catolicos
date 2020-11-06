import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actividad } from '@models/actividad';
import { ActividadForoUsuario } from '@models/ActividadForoUsuario';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private httpClient: HttpClient) { }

  listar(sesion_id: number): Observable<Actividad[]>{
    return this.httpClient.get<Actividad[]>(`${environment.API_URL}/actividades/${sesion_id}`);
  }

  listarTareasEstudiante(obj: ActividadTareaUsuario): Observable<Actividad[]>{
    // Initialize Params Object
    let Params = new HttpParams();

    // Begin assigning parameters
    Params = Params.append('actividad_id', obj.actividad_id.toString());
    Params = Params.append('usuario_id', obj.usuario_id.toString());
    const headers = new HttpHeaders({'h1':'v1','h2':'v2'});

    return this.httpClient.get<Actividad[]>(`${environment.API_URL}/actividades/tarea/`+JSON.stringify(obj));
  }

  registrar(obj: Actividad){
    return this.httpClient.post(`${environment.API_URL}/actividades`, obj);
  }

  registrarTarea(obj: FormData){
        return this.httpClient.post(`${environment.API_URL}/actividades/tarea`, obj);
  }

  registrarForo(obj: ActividadForoUsuario){
    return this.httpClient.post(`${environment.API_URL}/actividades/foro`, obj);
}

  buscar(id: number): Observable<Actividad>{
    return this.httpClient.delete(`${environment.API_URL}/actividades/${id}`);
  }

  actualizar(obj: Actividad){
    return this.httpClient.put(`${environment.API_URL}/actividades/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/actividades/${id}`)
  }

  eliminarTarea(id: number){
    return this.httpClient.delete(`${environment.API_URL}/actividades/tarea/${id}`)
  }

  actualizarValoracion(id: number, obj: ActividadTareaUsuario): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/actividades/actividad/${id}`, obj)
  }
}
