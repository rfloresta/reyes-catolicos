import { Component, OnInit } from '@angular/core';
import { Actividad } from '@models/Actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-estudiante-modal',
  templateUrl: './archivos-estudiante-modal.component.html',
  styleUrls: ['./archivos-estudiante-modal.component.css']
})
export class ArchivosEstudianteModalComponent implements OnInit {

    actividad: Actividad;
    tipo: number;
    tarea: ActividadTareaUsuario;

     constructor(private actividadService: ActividadService,
      public bsModalRef2: BsModalRef,
    ) { }
  
    ngOnInit() {
  
    }

    
    actualizarValoracion() {
      
      const tarea:ActividadTareaUsuario  = {
        valoracion: this.tarea.valoracion
      }
      this.actividadService.actualizarValoracionTarea(this.tarea.id, tarea).subscribe(res => {
        return;
      }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
      );
  
    }
  
}