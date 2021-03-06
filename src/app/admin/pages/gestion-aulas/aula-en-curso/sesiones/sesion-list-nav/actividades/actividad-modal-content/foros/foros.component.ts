import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/Actividad';
import { ActividadForoUsuario } from '@models/ActividadForoUsuario';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import * as moment from 'moment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { InformacionForoModalComponent } from './informacion/informacion-foro-modal.component';

@Component({
  selector: 'app-foros',
  templateUrl: './foros.component.html',
  styleUrls: ['./foros.component.css']
})
export class ForosComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;

  @Input() actividadNieto: Actividad;
  @Input() usuarioResponseHijo: UsuarioResponse;
  @Input() tipoVisnieto: number;
  @Input() estadoNieto: string;
  @Output() hide = new EventEmitter();
  actividadForoUsuario: ActividadForoUsuario = {};
  foroUsuarios: ActividadForoUsuario[] = [];
  actividadForoUsuarioForm: FormGroup;
  actividadUsuario: Object;
  cargando: boolean;
  editorOptions: any;
  constructor(private actividadService: ActividadService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {

    this.editorOptions= {
      toolbar: [
        ['bold', 'italic', 'underline'],
        [{ 'indent': '-1'}, { 'indent': '+1' }],   
        [{ 'align': [] }],
        ['clean'], 
        [{ 'list': 'ordered'}, { 'list': 'bullet' }]
      ]
  };

    this.actividadForoUsuario.usuario_id = this.usuarioResponseHijo.id;
    this.actividadForoUsuario.actividad_id = this.actividadNieto.id;

    this.validar();
    this.actividadUsuario= {
      id: this.actividadNieto.id,
      usuario_id: this.usuarioResponseHijo.id,
      tipo_usuario_id: this.usuarioResponseHijo.tipo
    }
      this.listarRespuestasForosEstudiante(this.actividadUsuario);
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
        if (res === "ok") {
          this.toastr.success("El foro ha sido registrado");
          this.actividadForoUsuarioForm.reset();
          this.validar();
          this.listarRespuestasForosEstudiante(this.actividadUsuario);
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

  listarRespuestasForosEstudiante(actividadUsuario: any) {
    this.cargando = true;
    setTimeout(() => {
      this.actividadService.listarRespuestasForosEstudiante(actividadUsuario)
    .subscribe(res => {
      if(res){
        this.foroUsuarios = res;
      }
    },err => console.log(err)
    );
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

  openModalInfo(){
    const initialState = {
      actividad_id: this.actividadNieto.id,
      aula_anio_id: localStorage.getItem('ai'),
      title: 'Información del foro '+this.actividadNieto.titulo
    };
    this.bsModalRef = this.modalService.show(InformacionForoModalComponent, {initialState,id:3,  ignoreBackdropClick: true});
  }

  actualizarValoracion(obj:ActividadForoUsuario) {
      
    const foro  = {
      valoracion: obj.valoracion
    }
    this.actividadService.actualizarValoracionForo(obj.id, foro).subscribe(res => {
      return;
    }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
    );

  }
  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}