import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-archivos-estudiante-modal',
  templateUrl: './archivos-estudiante-modal.component.html',
  styleUrls: ['./archivos-estudiante-modal.component.css']
})
export class ArchivosEstudianteModalComponent implements OnInit, OnDestroy {

    actividad: Actividad;
    tipo: number;
    tarea: ActividadTareaUsuario;

     constructor(private actividadService: ActividadService,
      public bsModalRef2: BsModalRef,
    ) { }
  
    ngOnInit() {
  
    }

    
  
  
  
    ngOnDestroy(): void {
      // this.dtTrigger.unsubscribe();
    }
  
  
}