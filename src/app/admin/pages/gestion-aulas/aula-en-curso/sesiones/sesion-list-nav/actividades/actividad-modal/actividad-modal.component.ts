import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { Actividad } from '@models/actividad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Sesion } from '@models/sesion';
import { FormatoService } from '@services/formato/formato.service';
import { Formato } from '@models/Formato';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';
declare var $: any;

@Component({
  selector: 'app-actividad-modal',
  templateUrl: './actividad-modal.component.html',
  styleUrls: ['./actividad-modal.component.css']
})
export class ActividadModalComponent implements OnInit {

  @Input() sesionNieto: Sesion;
  @Input() actividadHijo: Actividad;
  @Input() accionHijo: string;
  @Output() hide = new EventEmitter();
  @Output() actividades = new EventEmitter<Actividad[]>();

  tipoActividadId: string = '';
  formatos: any[] = [];
  actividadForm: FormGroup;
  constructor(
    private actividadService: ActividadService,
    private formatoService:FormatoService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private sesionListNavComponent: SesionListNavComponent
  ) { }

  ngOnInit() {
    $('.selectpicker').selectpicker('refresh');
    if(this.actividadHijo.tipo_actividad_id!==null){
      let id = this.actividadHijo.tipo_actividad_id.toString();
      this.listarFormatos(id);
      this.tipoActividadId = id;
    }
      
    this.validar();
  }

  validar() {
    this.actividadForm = this._builder.group({
      id: this.actividadHijo.id,
      titulo: [this.actividadHijo.titulo, Validators.required],
      // contenido: [this.actividadHijo.contenido, Validators.required],
      // formato_id: [this.actividadHijo.formato_id, Validators.required],
      // tipo_actividad_id: [this.actividadHijo.tipo_actividad_id, Validators.required],
    });
  }

  onSubmit() {
    if (this.actividadForm.invalid) {
      return;
    }
    this.actividadHijo = this.actividadForm.value;
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    // this.actividadHijo.fecha = fecha;
    this.actividadHijo.sesion_id = this.sesionNieto.id;
    //Propiedad eliminada ya que solo se necesita para la vista no para el registro
    delete this.actividadHijo['tipo_actividad_id'];
    
    if (this.actividadHijo.id === null) {
      this.registrar(this.actividadHijo);
    } else this.actualizar(this.actividadHijo);
    
    setTimeout(() => {
      this.actividadService.listar(this.sesionNieto.id).subscribe(res => {
        this.actividades.emit(res);
        console.log('Res actividad-modal->', res);
      });
    }, 150);

  }

  registrar(obj: Actividad) {
    this.actividadService.registrar(obj).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.toastr.success("Nuevo actividad registrado");
          
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
    
  }

  actualizar(obj: Actividad) {
    console.log("actualizar", obj);
    this.actividadService.actualizar(obj).subscribe(
      res => {
        if (res === "ok") this.toastr.success('El actividad se actualizó correctamente')
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  ocultarModal() {
    this.hide.emit();
  }


  listarFormatos(tipoactividadId: string){
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 75);
    this.formatoService.listar(tipoactividadId).subscribe((formatos: Formato[])=> this.formatos = formatos);
  }


  actualizarLista(event: any) {
    this.tipoActividadId = event.target.value;
    //para que se muestre el tipo de contenido a insertar
    this.listarFormatos(this.tipoActividadId);    
  }

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.actividadForm.get(campo).errors.required) {
      mensaje = `El campo es requerido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.actividadForm.get(campo).touched || this.actividadForm.get(campo).dirty) &&
      !this.actividadForm.get(campo).valid
    )
  }


}
