import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadTareaUsuarioArchivo } from '@models/ActividadTareaUsuarioArchivo';
import { Retroalimentacion } from '@models/Retroalimentacion';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-archivos-estudiante',
  templateUrl: './archivos-estudiante.component.html',
  styleUrls: ['./archivos-estudiante.component.css']
})
export class ArchivosEstudianteComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() actividadVisnieto: Actividad;
  @Input() usuarioResponseNieto: UsuarioResponse;
  @Input() tipoTataranieto: number;
  @Input() tareaHermano: ActividadTareaUsuario;
  @Input() estadoNieto: string;
  @Output() hide = new EventEmitter();
  ActividadTareaUsuario: ActividadTareaUsuario = {};
  archivosEstudiante: ActividadTareaUsuarioArchivo[]=[];
  tareasUsuariosImg: ActividadTareaUsuario[] = [];
  tareasUsuariosDocs: ActividadTareaUsuario[] = [];
  retroalimentacion: Retroalimentacion = {
    id: null,
    pasos: {
      aclarar:  {
        enunciado: null,
        respuesta: null
      },
      sugerir:  {
        enunciado: null,
        respuesta: null
      },
      valorar:  {
        enunciado: null,
        respuesta: null
      },
      expresar:  {
        enunciado: null,
        respuesta: null
      },
    }
  };
  files: File[] = [];
  fileUpload: File[];
  ActividadTareaUsuarioForm: FormGroup;
  retroForm: FormGroup;
  pasosForm: FormGroup;
  url: string = `${environment.API_URL}/`;
  archivos: FormArray;
  cargando: boolean;
  constructor(private actividadService: ActividadService,
    private _builder: FormBuilder,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      pageLength: 2,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }
    }

    console.log('tipo hijo->', this.tipoTataranieto);
    console.log('hermano->', this.tareaHermano);


    let actividadId: number;
    let usuarioId: number;

    if(this.tipoTataranieto===3 || this.tipoTataranieto===2 || this.tipoTataranieto===1){
      actividadId = this.tareaHermano.actividad_id;
      usuarioId = this.tareaHermano.usuario_id;
      if(this.tipoTataranieto===3){
        this.validarRetro();
        this.retroalimentacion.actividad_tarea_usuario_id = this.tareaHermano.id;
      }
    }else if (this.tipoTataranieto === 4) {//estudiante
      actividadId = this.actividadVisnieto.id;
      usuarioId = this.usuarioResponseNieto.id;
    }

    this.ActividadTareaUsuario.usuario_id = usuarioId;
    this.ActividadTareaUsuario.actividad_id = actividadId;

    this.validar();

      this.listarTareaEstudiante(this.ActividadTareaUsuario);
    

  }

  onSubmit() {

    if (this.ActividadTareaUsuarioForm.invalid) {
      return;
    }

    //Validar que solo se suba 5MB
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    this.ActividadTareaUsuario.fecha = fecha;
    let form: FormData = new FormData();

    let archivo = <FormArray>this.ActividadTareaUsuarioForm.get('archivos');
    for (let i = 0; i < archivo.length; i++) {
      form.append('ruta_archivo', this.fileUpload[i]);
    }
    form.append('fecha', this.ActividadTareaUsuario.fecha);
    console.log('id tarea->',this.ActividadTareaUsuario.id);
    if(typeof this.ActividadTareaUsuario.id=== 'undefined'){
      // form.append('descripcion', this.ActividadTareaUsuarioForm.get('descripcion').value);
      form.append('actividad_id', this.ActividadTareaUsuario.actividad_id.toString());
      form.append('usuario_id', this.ActividadTareaUsuario.usuario_id.toString());
      this.registrarTarea(form);
    }else{
      form.append('actividad_tarea_usuario_id', this.ActividadTareaUsuario.id.toString());
      this.registrarArchivosEnTarea(form);
    }
    
    console.log('files->',this.fileUpload);
    
  }

  onSubmitRetro() {
    
    this.retroalimentacion.pasos = this.retroForm.value;
    if(this.retroalimentacion.id===null){
      this.registrarRetro(this.retroalimentacion)
    }else{
      this.actualizarRetro(this.retroalimentacion)
    }

    console.log('pasos->',this.retroForm.value);
    
  }

  validateSize(arr: FormArray) {
    return arr.length === 0 ? {
      invalidSize: true
    } : null;
  }

  validar() {
    this.ActividadTareaUsuarioForm = this._builder.group({
      descripcion: null,
      archivos: this._builder.array([], this.validateSize)
    });
  }

  validarRetro() {
    this.retroForm = this._builder.group({
        aclarar:  this._builder.group({
          enunciado: this.retroalimentacion.pasos.aclarar.enunciado,
          respuesta: this.retroalimentacion.pasos.aclarar.respuesta
        }),
        sugerir:  this._builder.group({
          enunciado: this.retroalimentacion.pasos.sugerir.enunciado,
          respuesta: this.retroalimentacion.pasos.sugerir.respuesta
        }),
        valorar:  this._builder.group({
          enunciado: this.retroalimentacion.pasos.valorar.enunciado,
          respuesta: this.retroalimentacion.pasos.valorar.respuesta
        }),
        expresar:  this._builder.group({
          enunciado: this.retroalimentacion.pasos.expresar.enunciado,
          respuesta: this.retroalimentacion.pasos.expresar.respuesta
        }),
  });
}

  registrarTarea(obj: FormData) {
    this.actividadService.registrarTarea(obj).subscribe(
      res => {
        console.log(res);
        if (res === "ok") {
          this.refrescar('La tarea ha sido registrada');
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

  registrarArchivosEnTarea(obj: FormData) {
    this.actividadService.registrarArchivosEnTarea(obj).subscribe(
      res => {
        if (res === "ok") {
          this.refrescar('El archivo ha sido registrado');
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
  
  registrarRetro(obj: Retroalimentacion) {
    this.actividadService.registrarRetro(obj).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success('La retroalimentación ha sido guardada.');
        }else{
          this.toastr.error('Ha ocurrido un problema al guardar.');
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error en el servidor.');
        console.log(err);
      }
    );
  }

  actualizarRetro(obj: Retroalimentacion) {
    this.actividadService.actualizarRetro(obj).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success('La retroalimentación ha sido guardada.');
        }else{
          this.toastr.error('Ha ocurrido un problema al guardar');
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
  }

  refrescar(msg: string){
    this.toastr.success(msg);
    this.ActividadTareaUsuarioForm.reset();
    this.files = [];
    this.fileUpload = [];
    this.validar();
      this.listarTareaEstudiante(this.ActividadTareaUsuario);
  }

  //Para Estudiante
  listarTareaEstudiante(ActividadTareaUsuario: ActividadTareaUsuario) {
    this.actividadService.listarTareaEstudiante(ActividadTareaUsuario)
      .subscribe(res => {
        console.log(res);
        if(typeof res.id!== 'undefined'){
          this.ActividadTareaUsuario.id = res.id;
        }
        this.tareaHermano = res;
        this.archivosEstudiante = res.archivos;
        this.listarDocs();
        this.listarImgs();
        if (this.isDtInitialized) {
          this.rerender();
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      });
  }

  listarDocs() {
    this.tareasUsuariosDocs = this.archivosEstudiante.filter(ActividadTareaUsuario => ActividadTareaUsuario.extension !== 'image/jpeg' && ActividadTareaUsuario.extension !== 'image/png');
  }
  
  listarImgs() {
    this.cargando = true;
    setTimeout(() => {
      this.tareasUsuariosImg = this.archivosEstudiante.filter(ActividadTareaUsuario => ActividadTareaUsuario.extension === 'image/jpeg' || ActividadTareaUsuario.extension === 'image/png');
      this.cargando = false;
    }, 1000);
  }

  listarRetro(){
    this.actividadService.listarRetro(this.tareaHermano.id).subscribe(
      (res: Retroalimentacion) => {
        if (res) {
          let passosObject: Object= JSON.parse(res.pasos);
          this.retroalimentacion = res;
          this.retroalimentacion.pasos = passosObject;
          this.validarRetro();
        };
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    );
  }

  eliminarTarea(obj: ActividadTareaUsuario) {
    console.log(obj);

    Swal.fire({
      title: `¿Está seguro de eliminar el archivo ${obj.descripcion}?`,
      text: "Una vez eliminado no se podrá revertir",
      width: 500,
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      // icon: 'warning',
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.actividadService.eliminarTarea(obj.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El archivo fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.archivosEstudiante = this.archivosEstudiante.filter(a => a.id !== obj.id);
            this.listarDocs();
            this.listarImgs();
            this.rerender();
          }
        );
      }
    })
  }

  actualizarValoracion(obj: ActividadTareaUsuario) {
    this.ActividadTareaUsuario = {
      valoracion: obj.valoracion
    }
    this.actividadService.actualizarValoracion(obj.id, this.ActividadTareaUsuario).subscribe(res => {

    }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
    );

  }

  ocultarModal() {
    this.hide.emit();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        this.archivos = this.ActividadTareaUsuarioForm.get('archivos') as FormArray;
        this.archivos.push(this._builder.group({
          archivo: event.target.files[i]
        }
        ));
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.files.push(event.target.result);
        }
        //UNA ALTERNATIVA SERÍA PONER EL MENU DE FOTOS Y DOCUMENTOS MÁS ARRIBA Y ASÍ LOS BOTONES
        //Y LA FORMA DE SUBIR ARCHIVO SERIA DE ACUERDO A LA OPCIÓN QUE ELIJA EL USUARIO
        // if(event.target.files[i].type==='application/pdf'){
        //  let a= event.target.files[i]=null;
        //   reader.readAsDataURL(a);
        //   reader.result;
        // }else{
        reader.readAsDataURL(event.target.files[i]);
        // }
        this.fileUpload = Array.from(event.target.files);
      }
    }

  }

  quitarTareas(i: number) {
    this.files.splice(i, 1);
    this.archivos.value.splice(i,1);
    this.archivos.controls.splice(i,1);
    this.fileUpload.splice(i,1);
    if(this.archivos.controls.length === 0){
      this.validar();
    }    
  }

  mensajeError(group: string, control: string): string{
   
    let mensaje: string;
    if(this.retroForm.controls['pasos'].get(group).get(control).errors.required){
      mensaje = `El campo es requerido`;
    }
    return mensaje;
  }

  campoValido(group: string, control: string): boolean{

    return (
      (this.retroForm.controls['pasos'].get(group).get(control).touched || this.retroForm.controls['pasos'].get(group).get(control).dirty) && 
      !this.retroForm.controls['pasos'].get(group).get(control).valid
    )
  }

}