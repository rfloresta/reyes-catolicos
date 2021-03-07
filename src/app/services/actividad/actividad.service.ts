import { HttpClient, HttpParams, HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Form } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadForoUsuario } from '@models/ActividadForoUsuario';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { Retroalimentacion } from '@models/Retroalimentacion';
import { Usuario } from '@models/Usuario';
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

  listarTareaEstudiante(obj: ActividadTareaUsuario): Observable<ActividadTareaUsuario>{
    return this.httpClient.get<ActividadTareaUsuario>(`${environment.API_URL}/api/actividades/tarea/`+JSON.stringify(obj));
  }

  listarTareaEstudiantes(actividad_id: number): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/tareas/${actividad_id}`);
  }

  listarEstudiantesSinTarea(object: any): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/tareas/sin-participacion/${JSON.stringify(object)}`);
  }

  listarRespuestasForosEstudiante(actividadUsuario: any): Observable<ActividadForoUsuario[]>{
    return this.httpClient.get<ActividadForoUsuario[]>(`${environment.API_URL}/api/actividades/foro/${JSON.stringify(actividadUsuario)}`);
  }

  listarParticipacionForoEstudiantes(actividad_id: number): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/foros/participacion/${actividad_id}`);
  }

  listarSinParticipacionForoEstudiantes(object: any): Observable<ActividadTareaUsuario[]>{
    return this.httpClient.get<ActividadTareaUsuario[]>(`${environment.API_URL}/api/actividades/foros/sin-participacion/${JSON.stringify(object)}`);
  }

  listarFotosInforme(sesionId: number): Observable<ActividadForoUsuario[]>{
    return this.httpClient.get<ActividadForoUsuario[]>(`${environment.API_URL}/api/actividades/informe_fotos/${sesionId}`);
  }

  listarRetro(actividadTareaUsuarioid: number): Observable<Retroalimentacion>{
    return this.httpClient.get<Retroalimentacion>(`${environment.API_URL}/api/actividades/tarea/retro/${actividadTareaUsuarioid}`);
  }

  registrar(obj: Actividad){
    return this.httpClient.post(`${environment.API_URL}/api/actividades`, obj);
  }

  registrarTarea(obj: FormData){
        return this.httpClient.post(`${environment.API_URL}/api/actividades/tarea`, obj);
  }
  registrarArchivosEnTarea(archivos: FormData){    
    return this.httpClient.post(`${environment.API_URL}/api/actividades/tarea/archivos`, archivos);
  }
  registrarForo(obj: ActividadForoUsuario){
    return this.httpClient.post(`${environment.API_URL}/api/actividades/foro`, obj);
}

  registrarRetro(retro: Retroalimentacion){    
  return this.httpClient.post(`${environment.API_URL}/api/actividades/tarea/retro`, retro);
  }

  buscar(id: number): Observable<Actividad>{
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/${id}`);
  }

  actualizar(obj: Actividad){
    return this.httpClient.put(`${environment.API_URL}/api/actividades/${obj.id}`, obj);
  }
  actualizarValoracion(id: number, obj: ActividadTareaUsuario): Observable<any>{
    return this.httpClient.patch(`${environment.API_URL}/api/actividades/actividad/${id}`, obj)
  }
  actualizarRetro(obj: Retroalimentacion): Observable<any>{
    return this.httpClient.put(`${environment.API_URL}/api/actividades/tarea/retro/${obj.id}`, obj)
  }
  eliminar(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/${id}`)
  }

  eliminarTarea(id: number){
    return this.httpClient.delete(`${environment.API_URL}/api/actividades/tarea/${id}`)
  }

 
}
