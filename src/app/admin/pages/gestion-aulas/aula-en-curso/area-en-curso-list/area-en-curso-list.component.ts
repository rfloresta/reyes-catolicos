import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { Sesion } from '@models/sesion';
import { UsuarioResponse } from '@models/Usuario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-area-en-curso-list',
  templateUrl: './area-en-curso-list.component.html',
  styleUrls: ['./area-en-curso-list.component.css']
})
export class AreaEnCursoListComponent implements OnInit, OnDestroy {

  aulaEnCursoAreasHijo: AulaEnCursoArea[] = [];
  usuario: UsuarioResponse;
  tipo: number;
  sesion: Sesion =
    {
    }

  area: AulaEnCursoArea;
  accionEstado: string = "Activa";
  aula_anio_id: string;
  cargando: boolean;
  urlAnterior: string;
  url: string = `${environment.API_URL}/`;

  constructor(private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private router: Router
  ) { }
 
  ngOnInit(): void {

    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;
    this.cargando = true;
    if (this.tipo === 1 || this.tipo === 2) {
      let aula_anio_id = localStorage.getItem('ai');
      console.log(aula_anio_id);
  
      this.aulaEnCursoAreaService.listar(aula_anio_id).subscribe(
        (res: AulaEnCursoArea[]) => {
          console.log(res);
          setTimeout(() => {
            this.aulaEnCursoAreasHijo = res;
            this.cargando = false;
          }, 1000);
        },
        err => console.error(err)
      );
    } else if (this.tipo === 3 || this.tipo === 4)  {
      let aulaEnCursoAreasString = localStorage.getItem('areas');
      setTimeout(() => {
        this.aulaEnCursoAreasHijo = JSON.parse(aulaEnCursoAreasString);
        this.cargando = false;
      }, 1000);
    }
    // Listar aulaEnCursos
    
    console.log('areas', this.aulaEnCursoAreasHijo);



  }

  consultarArea(area: AulaEnCursoArea) {

    //almacenamos el area para listar sus sesiones mediante el id, 
    //además de mostrar el nombre en la vista Sesiones
    localStorage.setItem('area', JSON.stringify(area));
    if (this.tipo === 1 || this.tipo === 2) {
      this.router.navigate(['/principal/dashboard/aulas-en-curso/aula-en-curso/areas/sesiones']);
    } else if (this.tipo === 3 || this.tipo === 4)  {
      this.router.navigate(['/principal/inicio/aula-en-curso/areas/sesiones']);
    }
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
