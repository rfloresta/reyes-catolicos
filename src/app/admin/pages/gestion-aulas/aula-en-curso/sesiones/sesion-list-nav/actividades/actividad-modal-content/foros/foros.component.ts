import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadForoUsuario } from '@models/ActividadForoUsuario';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.css']
})
export class ForosComponent implements OnInit, OnDestroy {

  @Input() actividadNieto: Actividad;
  @Input() usuarioResponseHijo: UsuarioResponse;
  @Input() tipoVisnieto: number;
  @Input() estadoNieto: string;

  @Output() hide = new EventEmitter();
  actividadForoUsuario: ActividadForoUsuario = {};
  foroUsuarios: ActividadForoUsuario[] = [];
  actividadForoUsuarioForm: FormGroup;
  cargando: boolean;
  constructor(private actividadService: ActividadService,
    private _builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
    this.actividadForoUsuario.usuario_id = this.usuarioResponseHijo.id;
    this.actividadForoUsuario.actividad_id = this.actividadNieto.id;

    this.validar();
      this.listarForosEstudiante(this.actividadForoUsuario.actividad_id);
  }

  onSubmit() {

    if (this.actividadForoUsuarioForm.invalid) {
      return;
    }

    this.actividadForoUsuario.respuesta = this.actividadForoUsuarioForm.get('respuesta').value;
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    this.actividadForoUsuario.fecha = fecha;
    this.registrarForo(this.actividadForoUsuario);

  }


  validar() {
    this.actividadForoUsuarioForm = this._builder.group({
      respuesta: [null, Validators.required]
    });
  }

  registrarForo(obj: ActividadForoUsuario) {
    this.actividadService.registrarForo(obj).subscribe(
      res => {
        console.log(res);
        if (res === "ok") {
          this.toastr.success("El foro ha sido registrado");
          this.actividadForoUsuarioForm.reset();
          this.validar();
          this.listarForosEstudiante(this.actividadForoUsuario.actividad_id);
        }else{
          this.toastr.error('Ha ocurrido un problema al registrar');
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
  }

  listarForosEstudiante(id: number) {
    this.cargando = true;
    setTimeout(() => {
      this.actividadService.listarForosEstudiante(id)
    .subscribe(res => {
      this.foroUsuarios = res;
    });
      this.cargando = false;
    }, 1000); 
  }

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.actividadForoUsuarioForm.get(campo).errors.required) {
      mensaje = `El campo es requerido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.actividadForoUsuarioForm.get(campo).touched || this.actividadForoUsuarioForm.get(campo).dirty) &&
      !this.actividadForoUsuarioForm.get(campo).valid
    )
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}