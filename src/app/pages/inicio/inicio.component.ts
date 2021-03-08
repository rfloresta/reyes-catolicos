import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnioEscolar } from '@models/AnioEscolar';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { UsuarioResponse } from '@models/Usuario';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { switchMap } from 'rxjs/operators';
import { FlujoService } from 'src/app/services/flujo.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  anioEscolar: AnioEscolar;
  aulaEnCursoAreasHijo: AulaEnCursoArea[] = [];
  constructor(private flujoService: FlujoService,
    private aulaEnCursoService: AulaEnCursoService,
    private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private router: Router
  ) { }
  url: string = `${environment.API_URL}/`;
  cargando: boolean;
  cargando2: boolean;

  ngOnInit(): void {
    window.scrollTo(0, 0);
    let usuarioString = localStorage.getItem('usuario');
    let usuario: UsuarioResponse = JSON.parse(usuarioString);
    let anioString = localStorage.getItem('anio_activo');
    this.anioEscolar = JSON.parse(anioString);
    this.cargando = true;
    //obtener el aula_id actual del estudiante o profesor
    this.aulaEnCursoService.obtenerId(usuario.id)
      .pipe(
        switchMap((res: AulaEnCurso) => {
          localStorage.setItem('ai', res.id.toString());
          //Listar las areas del aula
          return this.aulaEnCursoAreaService.listar(res.id.toString());
        })
      ).subscribe(
        (res: AulaEnCursoArea[]) => {
          setTimeout(() => {
            this.aulaEnCursoAreasHijo = res;
            localStorage.setItem('areas', JSON.stringify(this.aulaEnCursoAreasHijo));
            this.cargando = false;
          }, 1000);
        },
        err => console.error(err)
      );

    this.cargando2 = true;

    setTimeout(() => {
      this.cargando2 = false
    }, 1000);

    // $.getScript('../../../assets/js/init/initMenu.js');
  }

  consultarArea(area: AulaEnCursoArea) {

    //almacenamos el area para listar sus sesiones mediante el id, 
    //además de mostrar el nombre en la vista Sesiones
    localStorage.setItem('area', JSON.stringify(area));
    this.router.navigate(['/principal/inicio/aula-en-curso/areas/sesiones']);
  }

}
