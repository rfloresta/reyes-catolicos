import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActividadService } from '@services/actividad/actividad.service';
import { Actividad } from '@models/actividad';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { Sesion } from '@models/sesion';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';
declare var $: any;

@Component({
  selector: 'app-actividad-modal-form',
  templateUrl: './actividad-modal-form.component.html',
  styleUrls: ['./actividad-modal-form.component.css']
})
export class ActividadModalFormComponent implements OnInit {

  @Input() sesionNieto: Sesion;
  @Input() actividadHijo: Actividad;
  @Input() accionHijo: string;
  @Output() hide = new EventEmitter();
  @Output() actividades = new EventEmitter<Actividad[]>();

  actividadForm: FormGroup;
  activo: boolean = true;
  tipoActividades:any = [];
  constructor(
    private actividadService: ActividadService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 75);
    this.tipoActividades = [
      {
      id: 1,
      nombre: 'Tarea'
      },
      {
        id: 2,
        nombre: 'Foro'
      }
    ]
    this.validar();
    // this.showHide();
  }

  validar() {
    this.actividadForm = this._builder.group({
      id: this.actividadHijo.id,
      titulo: [this.actividadHijo.titulo, Validators.required],
      descripcion: [this.actividadHijo.descripcion, Validators.required],
      fecha_inicio: [this.actividadHijo.fecha_inicio],
      fecha_fin: [this.actividadHijo.fecha_fin],
      tipo_actividad_id: [this.actividadHijo.tipo_actividad_id, Validators.required],
    });
  }

  onSubmit() {
    if (this.actividadForm.invalid) {
      return;
    }
    this.actividadHijo = this.actividadForm.value;
    if(this.actividadHijo.fecha_inicio!==null && this.actividadHijo.fecha_fin!==null){
      this.actividadHijo.fecha_inicio = this.formatearFecha(this.actividadHijo.fecha_inicio);
      this.actividadHijo.fecha_fin = this.formatearFecha(this.actividadHijo.fecha_fin);
    }
    
    this.actividadHijo.sesion_id = this.sesionNieto.id;
    if (this.actividadHijo.id === null) {
      this.actividadHijo.fecha_publicacion = moment().format("YYYY-MM-DD HH:mm:ss");
      this.registrar(this.actividadHijo);
    } else this.actualizar(this.actividadHijo);
    
  }

  registrar(obj: Actividad) {
    this.actividadService.registrar(obj).subscribe(
      res => {
        if (res) {
          this.toastr.success("Nueva actividad registrada");
          this.listarActividades();
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
    
  }

  listarActividades(){
    this.actividadService.listar(this.sesionNieto.id).subscribe(res => {
      this.actividades.emit(res);
    });
  }

  actualizar(obj: Actividad) {
    this.actividadService.actualizar(obj).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success('La actividad se actualizó correctamente')
          this.listarActividades();
        }
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

  formatearFecha(fecha: any): string{
    return moment(fecha).format("YYYY-MM-DD HH:mm:ss");
  }

  showHide(){
    this.activo = !this.activo;
    if(this.activo) {
     this.actividadForm.get('fecha_inicio').enable();
     this.actividadForm.get('fecha_fin').enable();
    } else {
       this.actividadForm.get('fecha_inicio').disable();
       this.actividadForm.get('fecha_fin').disable();
     }  
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
