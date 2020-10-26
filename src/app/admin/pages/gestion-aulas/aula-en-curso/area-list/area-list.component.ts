import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import Swal from 'sweetalert2'
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { filter } from 'rxjs/operators';
import { Sesion } from '@models/sesion';
import { SesionService } from '@services/sesion/sesion.service';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit, OnDestroy {

  aulaEnCursoAreasHijo: AulaEnCursoArea[] = [];

  sesion: Sesion = 
    {
    // id:2,
    // numero: 2,
    // fecha: "2020-10-26 13:32:46",
    // link: "https",
    // tema: "Los colores secundarios",
    // area_aula_anio_id: 9
    }
  
  area: AulaEnCursoArea;
  accionEstado: string = "Activa";
  aula_anio_id: string;
  cargando: boolean;
  urlAnterior: string;
  imgRuta: string = "../../../../../../../assets/img/";

  constructor(private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private sesionService: SesionService,
    private flujoService: FlujoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  
    // Listar aulaEnCursos
    this.cargando = true;
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

  }

  consultarArea(area: AulaEnCursoArea) {

    //almacenamos el area para listar sus sesiones mediante el id, 
    //además de mostrar el nombre en la vista Sesiones
    localStorage.setItem('area', JSON.stringify(area));

  // hacer busqueda de la sesion activa segun la semana
  // this.sesionService.obtenerSesionActual(area.id).subscribe(
  //   (res: Sesion) => {
      
  //     this.sesion = res;
  //     console.log('Sesion in suscribe',this.sesion);
      
  //     this.flujoService.theItem = JSON.stringify(res);


  //   },
  //   err => console.error(err)
  // );
// localStorage.setItem('sesion', JSON.stringify(this.sesion));


this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones']);





  }


  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
