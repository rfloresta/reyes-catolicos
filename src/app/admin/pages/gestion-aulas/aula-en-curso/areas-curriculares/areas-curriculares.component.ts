import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import Swal from 'sweetalert2'
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-areas-curriculares',
  templateUrl: './areas-curriculares.component.html'
})
export class AreasCurricularesComponent implements OnInit, OnDestroy {

  constructor(private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private flujoService: FlujoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
  
    // Listar aulaEnCursos

  }

  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }


  // consultarArea(aulaEnCursoArea: AulaEnCursoArea) {
  //   this.router.navigate(['principal/dashboard/gestion-aulas/aula-en-curso-areas/form']);
  // }


  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
