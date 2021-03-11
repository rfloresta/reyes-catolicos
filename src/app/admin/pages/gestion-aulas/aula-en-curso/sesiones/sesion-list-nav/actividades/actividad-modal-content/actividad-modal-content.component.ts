import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/Actividad';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actividad-modal-content',
  templateUrl: './actividad-modal-content.component.html',
  styleUrls: ['./actividad-modal-content.component.css']
})
export class ActividadModalContentComponent implements OnInit, OnDestroy {

  @Input() accionHijo: string;
  @Input() actividadHijo: Actividad;
  @Input() tipoNieto: number;
  @Input() estadoHijo: string;
  @Output() hide = new EventEmitter<number>();

  usuarioResponse: UsuarioResponse;
  
  constructor(private actividadService: ActividadService,
    private _builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  
    let usuarioStorage = localStorage.getItem('usuario');
    this.usuarioResponse = JSON.parse(usuarioStorage);

  }

  ocultarModal() {
    this.hide.emit();
  }


  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }



}