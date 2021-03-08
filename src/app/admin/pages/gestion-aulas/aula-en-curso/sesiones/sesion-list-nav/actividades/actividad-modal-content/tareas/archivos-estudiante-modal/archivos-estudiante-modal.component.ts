import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
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
      this.actividadService.actualizarValoracion(this.tarea.id, tarea).subscribe(res => {
        return;
      }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
      );
  
    }
  
}