import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Actividad } from '@models/actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { DataTableDirective } from 'angular-datatables';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @Input() actividadNieto: Actividad;
  @Input() usuarioResponseHijo: UsuarioResponse;
  @Input() tipoVisnieto: number;
  @Output() hide = new EventEmitter();
  ActividadTareaUsuario: ActividadTareaUsuario = {};
  tareasUsuarios: ActividadTareaUsuario[] = [];
  tareasUsuariosImg: ActividadTareaUsuario[] = [];
  tareasUsuariosDocs: ActividadTareaUsuario[] = [];
  files: File[] = [];
  fileUpload: File[];
  ActividadTareaUsuarioForm: FormGroup;
  tareas: FormArray;
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

    this.ActividadTareaUsuario.usuario_id = this.usuarioResponseHijo.id;
    this.ActividadTareaUsuario.actividad_id = this.actividadNieto.id;

    this.validar();

    if(this.tipoVisnieto!==4){
      this.listarTareasEstudiantes(this.ActividadTareaUsuario.actividad_id);
       
    }else{
      this.listarTareasEstudiante(this.ActividadTareaUsuario);
    }

  }

  onSubmit() {

    if (this.ActividadTareaUsuarioForm.invalid) {
      return;
    }

    //Validar que solo se suba 5MB
    let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
    this.ActividadTareaUsuario.fecha = fecha;
    let form: FormData = new FormData();

    let tarea = <FormArray>this.ActividadTareaUsuarioForm.get('tareas');
    for (let i = 0; i < tarea.length; i++) {

      form.append('ruta_archivo', this.fileUpload[i]);

    }
    form.append('descripcion', JSON.stringify(tarea.value));
    form.append('fecha', this.ActividadTareaUsuario.fecha);
    form.append('actividad_id', this.ActividadTareaUsuario.actividad_id.toString());
    form.append('usuario_id', this.ActividadTareaUsuario.usuario_id.toString());
    this.registrarTarea(form);
    console.log('files->',this.fileUpload);
    
  }

  validateSize(arr: FormArray) {
    return arr.length === 0 ? {
      invalidSize: true
    } : null;
  }

  validar() {
    this.ActividadTareaUsuarioForm = this._builder.group({
      tareas: this._builder.array([], this.validateSize)
    });
  }

  registrarTarea(obj: FormData) {
    this.actividadService.registrarTarea(obj).subscribe(
      res => {
        console.log(res);
        if (res === "ok") {
          this.toastr.success("La tarea ha sido registrada");
          this.ActividadTareaUsuarioForm.reset();
          this.files = [];
          this.fileUpload = [];
          this.validar();
          if(this.tipoVisnieto!==4){
            this.listarTareasEstudiantes(this.ActividadTareaUsuario.usuario_id);
          }else{
            this.listarTareasEstudiante(this.ActividadTareaUsuario);
          }        
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

  //Para Estudiante
  listarTareasEstudiante(ActividadTareaUsuario: ActividadTareaUsuario) {
    this.actividadService.listarTareasEstudiante(ActividadTareaUsuario)
      .subscribe(res => {
        this.tareasUsuarios = res;
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

  //Para Profesores
  listarTareasEstudiantes(id: number) {
    this.actividadService.listarTareasEstudiantes(id)
      .subscribe(res => {
        this.tareasUsuarios = res;
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
    this.tareasUsuariosDocs = this.tareasUsuarios.filter(ActividadTareaUsuario => ActividadTareaUsuario.extension !== 'image/jpeg' && ActividadTareaUsuario.extension !== 'image/png');
  }
  
  listarImgs() {
    this.cargando = true;
    setTimeout(() => {
      this.tareasUsuariosImg = this.tareasUsuarios.filter(ActividadTareaUsuario => ActividadTareaUsuario.extension === 'image/jpeg' || ActividadTareaUsuario.extension === 'image/png');
      this.cargando = false;
    }, 1000);
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
            this.tareasUsuarios = this.tareasUsuarios.filter(a => a.id !== obj.id);
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
        this.tareas = this.ActividadTareaUsuarioForm.get('tareas') as FormArray;
        this.tareas.push(this._builder.group({
          descripcion: null
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
    this.tareas.value.splice(i,1);
    this.tareas.controls.splice(i,1);
    this.fileUpload.splice(i,1);
    if(this.tareas.controls.length === 0){
      this.validar();
    }    
  }


}