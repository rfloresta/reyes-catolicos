import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoUsuario } from 'src/app/models/TipoUsuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoUsuarioService {

  constructor(private httpClient: HttpClient) { }

  listar(): Observable<TipoUsuario[]>{
    return this.httpClient.get<TipoUsuario[]>(`${environment.API_URL}/tipo_usuarios`);
  }
  
}
