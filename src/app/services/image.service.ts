import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImage(imageUrl: string): Observable<Promise<Blob>> {
    return this.http
        .get(imageUrl, {responseType: 'blob'}).pipe(
          map((res: any) => res.blob())
        )
}
}
