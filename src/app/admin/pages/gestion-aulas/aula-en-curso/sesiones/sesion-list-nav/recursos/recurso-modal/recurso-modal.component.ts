import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { Recurso } from '@models/recurso';
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
  selector: 'app-recurso-modal',
  templateUrl: './recurso-modal.component.html',
  styleUrls: ['./recurso-modal.component.css']
})
export class RecursoModalComponent implements OnInit {
  @ViewChild("file") file;
  @Input() sesionNieto: Sesion;
  @Input() recursoHijo: Recurso;
  @Input() accionHijo: string;
  @Output() hide = new EventEmitter();
  @Output() recursos = new EventEmitter<Recurso[]>();

  tipoRecursoId: string = '';
  formatos: any[] = [];
  recursoForm: FormGroup;
  archivo: any;
  fileUpload: File;
  // form: FormData = new FormData();
  constructor(
    private recursoservice: RecursoService,
    private formatoService: FormatoService,
    private _builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 75);

      if (this.recursoHijo.tipo_recurso_id !== null) {
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

    this.recursoHijo.sesion_id = this.sesionNieto.id;

    if (this.recursoHijo.id === null) {//Registrar
      let form =new FormData();
      //Obtener el id del video de youtube para cambiar el link a embebido
      if (this.recursoHijo.formato_id == 2) {
        let youtubeId = this.recursoHijo.contenido.split('v=')[1].split('&')[0];
        this.recursoHijo.contenido = `https://www.youtube.com/embed/${youtubeId}`;
      }

      let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
      if (this.recursoHijo.tipo_recurso_id == 1) {//Solo para archivos
        
        //ve cambios del input contenido
        let fi = this.file.nativeElement;
        if (fi.files && fi.files[0]) {
          this.fileUpload = fi.files[0];
        }

        form.append('titulo', this.recursoHijo.titulo);
        form.append('contenido', this.fileUpload);
        form.append('formato_id', this.recursoHijo.formato_id.toString());
        form.append('sesion_id', this.recursoHijo.sesion_id.toString());
        form.append('fecha', fecha);

        this.registrarArchivo(form);

      } else if (this.recursoHijo.tipo_recurso_id == 2) {//solo para links
        
        //campo solo para la vista es por eso que se elimina
        delete this.recursoHijo['tipo_recurso_id'];
        this.recursoHijo.fecha = fecha;
        this.registrarLink(this.recursoHijo);
      }
    } else {//Actualizar
      delete this.recursoHijo['tipo_recurso_id'];
      this.actualizar(this.recursoHijo);
    }

  }

  registrarArchivo(obj: FormData) {
    this.recursoservice.registrarArchivo(obj).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("Nuevo Recurso registrado");
          this.listarRecursos();
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );

  }
  registrarLink(obj: Recurso) {
    this.recursoservice.registrarLink(obj).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("Nuevo Recurso registrado");
          this.listarRecursos();
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado.');
        console.log(err);
      }
    );
  }
  actualizar(obj: Recurso) {
    this.recursoservice.actualizar(obj).subscribe(
      res => {
        if (res === "ok") {
        this.toastr.success('El recurso se actualizó correctamente');
        this.listarRecursos();
      }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado.');
        console.log(err);
      }
    )
  }

  listarRecursos(){
    this.recursoservice.listar(this.sesionNieto.id).subscribe(res => {
      this.recursos.emit(res);
      // this.form = null;
    });
  }

  ocultarModal() {
    this.hide.emit();
  }


  listarFormatos(tipoRecursoId: string) {
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 75);
    this.formatoService.listar(tipoRecursoId).subscribe((formatos: Formato[]) => this.formatos = formatos);
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
