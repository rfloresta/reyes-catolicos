import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { Actividad } from '@models/actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadTareaUsuarioArchivo } from '@models/ActividadTareaUsuarioArchivo';
import { ActividadService } from '@services/actividad/actividad.service';
import { DataTableDirective } from 'angular-datatables';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { ArchivosEstudianteModalComponent } from './archivos-estudiante-modal/archivos-estudiante-modal.component';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() actividadNieto: Actividad; 
  tarea: ActividadTareaUsuarioArchivo; 
  @Input() tipoVisnieto: number;
  @Output() hide = new EventEmitter();
  @Output() show = new EventEmitter<Object>();

  ActividadTareaUsuario: ActividadTareaUsuario = {};
  tareasUsuarios: ActividadTareaUsuario[] = [];   
  cargando: boolean;
  constructor(private actividadService: ActividadService,
    private modalService: BsModalService

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

     this.ActividadTareaUsuario.actividad_id = this.actividadNieto.id;
 
    this.listarTareasEstudiantes(this.ActividadTareaUsuario.actividad_id);
    console.log(this.tareasUsuarios);

  }

  //Para Profesores
  listarTareasEstudiantes(id: number) {
    this.actividadService.listarTareasEstudiantes(id)
      .subscribe(res => {
        console.log(res);
        if(res){
          this.tareasUsuarios = res;
          if (this.isDtInitialized) {
            this.rerender();
          } else {
            this.isDtInitialized = true;
            this.dtTrigger.next();
          }
        }
       
      });
  }


  ocultarModal() {
    this.hide.emit();
  }

  abrirArchivosEstudianteModal(tarea: ActividadTareaUsuario) {
    const initialState = {
     tarea,
     actividad: this.actividadNieto,
     tipo: this.tipoVisnieto
    };
    this.bsModalRef = this.modalService.show(ArchivosEstudianteModalComponent, {initialState,id:2,  ignoreBackdropClick: true, class: 'modal-lg'});
  }

  cerrarModal(modalId?: number){
    this.modalService.hide(modalId);
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