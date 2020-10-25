import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import Swal from 'sweetalert2'
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { filter } from 'rxjs/operators';
import { Sesion } from '@models/sesion';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit, OnDestroy {

  aulaEnCursoAreasHijo: AulaEnCursoArea[] = [];

  sesion: Sesion = 
    {
    id:1,
    numero: 1,
    fecha: "2020-10-25 13:32:46",
    link: "https",
    tema: "Los colores primarios",
    area_aula_anio_id: 9
    }
  

  accionEstado: string = "Activa";
  aula_anio_id: string;
  cargando: boolean;
  urlAnterior: string;
  imgRuta: string = "../../../../../../../assets/img/";

  constructor(private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private flujoService: FlujoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  
    // Listar aulaEnCursos
    this.cargando = true;
    let aula_anio_id = localStorage.getItem('ai');
    this.aulaEnCursoAreaService.listar(aula_anio_id).subscribe(
      (res: AulaEnCursoArea[]) => {
        setTimeout(() => {
          this.aulaEnCursoAreasHijo = res;
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );

  }

  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }


  consultarArea(id: string) {
    localStorage.setItem('aaai',id);

  // hacer busqueda de la sesion activa segun la semana aquí
  localStorage.setItem('sesion', JSON.stringify(this.sesion));

    this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones']);
  }


  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
