import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { Recurso } from '@models/recurso';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { SesionListNavComponent } from '../sesion-list-nav.component';
import { Sesion } from '@models/sesion';
import { FormatoService } from '@services/formato/formato.service';
import { Formato } from '@models/Formato';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';
declare var $: any;

@Component({
  selector: 'app-recurso-modal',
  templateUrl: './recurso-modal.component.html',
  styleUrls: ['./recurso-modal.component.css']
})
export class RecursoModalComponent implements OnInit {

  @Input() sesionNieto: Sesion;
  @Input() recursoHijo: Recurso;
  @Input() accionHijo: string;
  @Output() hide = new EventEmitter();
  @Output() recursos = new EventEmitter<Recurso[]>();

  tipoRecursoId: string = '';
  formatos: any[] = [];
  recursoForm: FormGroup;
  constructor(
    private recursoservice: RecursoService,
    private formatoService:FormatoService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    // private sesionListNavComponent: SesionListNavComponent
  ) { }

  ngOnInit() {
    $('.selectpicker').selectpicker('refresh');
    if(this.recursoHijo.tipo_recurso_id!==null){
      let id = this.recursoHijo.tipo_recurso_id.toString();
      this.listarFormatos(id);
      this.tipoRecursoId = id;
    }
      
    this.validar();
  }

  validar() {
    this.recursoForm = this._builder.group({
      id: this.recursoHijo.id,
      titulo: [this.recursoHijo.titulo, Validators.required],
      contenido: [this.recursoHijo.contenido, Validators.required],
      formato_id: [this.recursoHijo.formato_id, Validators.required],
      tipo_recurso_id: [this.recursoHijo.tipo_recurso_id, Validators.required],
    });
  }

  onSubmit() {
    if (this.recursoForm.invalid) {
      return;
    }
    this.recursoHijo = this.recursoForm.value;
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    this.recursoHijo.fecha = fecha;
    this.recursoHijo.sesion_id = this.sesionNieto.id;
    //Propiedad eliminada ya que solo se necesita para la vista no para el registro
    delete this.recursoHijo['tipo_recurso_id'];
    
    if (this.recursoHijo.id === null) {
      this.registrar(this.recursoHijo);
    } else this.actualizar(this.recursoHijo);
    
    setTimeout(() => {
      this.recursoservice.listar(this.sesionNieto.id).subscribe(res => {
        this.recursos.emit(res);
        console.log('Res recurso-modal->', res);
      });
    }, 150);

  }

  registrar(obj: Recurso) {
    this.recursoservice.registrar(obj).subscribe(
      res => {
        console.log(res);
        if (res) {
          this.toastr.success("Nuevo Recurso registrado");
          
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
    
  }

  actualizar(obj: Recurso) {
    console.log("actualizar", obj);
    this.recursoservice.actualizar(obj).subscribe(
      res => {
        if (res === "ok") this.toastr.success('El recurso se actualizó correctamente')
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


  listarFormatos(tipoRecursoId: string){
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 75);
    this.formatoService.listar(tipoRecursoId).subscribe((formatos: Formato[])=> this.formatos = formatos);
  }


  actualizarLista(event: any) {
    this.tipoRecursoId = event.target.value;
    //para que se muestre el tipo de contenido a insertar
    this.listarFormatos(this.tipoRecursoId);    
  }

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.recursoForm.get(campo).errors.required) {
      mensaje = `El campo es requerido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.recursoForm.get(campo).touched || this.recursoForm.get(campo).dirty) &&
      !this.recursoForm.get(campo).valid
    )
  }


}
