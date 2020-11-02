import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private httpClient: HttpClient) { }

  subir(file: any): Observable<any>{
    const input = new FormData();
    input.append('file', file);
    return this.httpClient.post<any>(`${environment.API_URL}/uploads`, input);
  }

}
