import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-informacion-foro-modal',
  templateUrl: './informacion-foro-modal.component.html',
  styleUrls: ['./informacion-foro-modal.component.css']
})
export class InformacionForoModalComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  bsModalRef: BsModalRef;
  closeBtnName: string;
  actividad_id: number;
  aula_anio_id: string;
  title: string;
  cantidad_estudiantes: string;

  estudiantesParticipacion: ActividadTareaUsuario[] = [];
  estudiantesSinParticipacion: ActividadTareaUsuario[] = [];
  constructor(private actividadService: ActividadService,
    public bsModalRef2: BsModalRef,
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      pageLength: 2,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }
    }
    this.cantidad_estudiantes = localStorage.getItem('cantidad_estudiantes');
    this.listarEstudiantesParticipacion();
    this.listarEstudiantesSinParticipacion();
  }
  //Para Profesores
  listarEstudiantesParticipacion() {
    this.actividadService.listarParticipacionForoEstudiantes(this.actividad_id)
      .subscribe(res => {
        if (res) {
          this.estudiantesParticipacion = res;
          if (this.isDtInitialized) {
            this.rerender();
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
          }
        }

      });
  }

  listarEstudiantesSinParticipacion() {
    const object: any = {
      actividad_id: this.actividad_id,
      aula_anio_id: this.aula_anio_id
    }
    this.actividadService.listarSinParticipacionForoEstudiantes(object)
      .subscribe(res => {
        if (res) {
          this.estudiantesSinParticipacion = res;
        }
      });
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}