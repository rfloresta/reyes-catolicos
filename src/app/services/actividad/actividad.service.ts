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
    return this.httpClient.get<Actividad[]>(`${environment.API_URL}/api/actividades/${sesion_id}`);
  }

  listarTareasEstudiante(obj: ActividadTareaUsuario): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/tarea/`+JSON.stringify(obj));
  }

  listarTareasEstudiantes(actividad_id: number): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/tareas/${actividad_id}`);
  }

  listarForosEstudiante(id: number): Observable<ActividadForoUsuario[]>{
    return this.httpClient.get<ActividadForoUsuario[]>(`${environment.API_URL}/api/actividades/foro/${id}`);
  }

  listarFotosInforme(sesionId: number): Observable<ActividadForoUsuario[]>{
    return this.httpClient.get<ActividadForoUsuario[]>(`${environment.API_URL}/api/actividades/informe_fotos/${sesionId}`);
  }

  registrar(obj: Actividad){
    return this.httpClient.post(`${environment.API_URL}/api/actividades`, obj);
  }

  registrarTarea(obj: FormData){
        return this.httpClient.post(`${environment.API_URL}/api/actividades/tarea`, obj);
  }

  registrarForo(obj: ActividadForoUsuario){
    return this.httpClient.post(`${environment.API_URL}/api/actividades/foro`, obj);
}

  buscar(id: number): Observable<Actividad>{
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/${id}`);
  }

  actualizar(obj: Actividad){
    return this.httpClient.put(`${environment.API_URL}/api/actividades/${obj.id}`, obj);
  }

  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/${id}`)
  }

  eliminarTarea(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/tarea/${id}`)
  }

  actualizarValoracion(id: number, obj: ActividadTareaUsuario): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/actividades/actividad/${id}`, obj)
  }
}
