// import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
// import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Actividad } from '@models/actividad';
// import { ActividadUsuario } from '@models/ActividadUsuario';
// import { ActividadService } from '@services/actividad/actividad.service';
// import { DataTableDirective } from 'angular-datatables';
// import * as moment from 'moment';
// import { ToastrService } from 'ngx-toastr';
// import { Subject } from 'rxjs';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-actividad-modal-content',
//   templateUrl: './actividad-modal-content.component.html',
//   styleUrls: ['./actividad-modal-content.component.css']
// })
// export class ActividadModalContentComponent implements OnInit, OnDestroy {

//   @Input() actividadHijo: Actividad;
//   @Output() hide = new EventEmitter();
//   actividadUsuario: ActividadUsuario = {};
//   actividadesUsuarios: ActividadUsuario[] = [];
//   actividadesUsuariosImg: ActividadUsuario[] = [];
//   files: File[] = [];
//   fileUpload: File[];
//   actividadUsuarioForm: FormGroup;
//   actividades: FormArray;
//   cargando: boolean;
//   constructor(private actividadService: ActividadService,
//     private _builder: FormBuilder,
//     private toastr: ToastrService
//   ) { }

//   ngOnInit() {

//     this.validar();
//       this.listarTareasEstudiante(this.actividadUsuario);
//   }

//   onSubmit() {

//     if (this.actividadUsuarioForm.invalid) {
//       return;
//     }

//     //Validar que solo se suba 5MB
//     let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
//     this.actividadUsuario.fecha = fecha;
//     let form: FormData = new FormData();

//     let actividad = <FormArray>this.actividadUsuarioForm.get('actividades');
//     for (let i = 0; i < actividad.length; i++) {

//       form.append('respuesta', this.fileUpload[i]);

//     }
//     form.append('descripcion', JSON.stringify(actividad.value));
//     form.append('fecha', this.actividadUsuario.fecha);
//     form.append('actividad_id', this.actividadUsuario.actividad_id.toString());
//     form.append('usuario_id', this.actividadUsuario.usuario_id.toString());
//     this.registrarTarea(form);
//     this.files = [];
//     this.fileUpload = [];
//     this.validar();
//   }

//   listarTareasEstudiante(actividadUsuario: ActividadUsuario) {
//     this.actividadService.listarTareasEstudiante(actividadUsuario)
//       .subscribe(res => {
//         this.actividadesUsuarios = res;
//         this.listarDocs();
//         this.listarImgs();
//       });
//   }

//   listarDocs() {
//     this.actividadesUsuariosDocs = this.actividadesUsuarios.filter(actividadUsuario => actividadUsuario.extension !== 'image/jpeg');
//   }

//   listarImgs() {
//     this.cargando = true;
//     setTimeout(() => {
//       this.actividadesUsuariosImg = this.actividadesUsuarios.filter(actividadUsuario => actividadUsuario.extension === 'image/jpeg' || actividadUsuario.extension === 'image/png');
//       this.cargando = false;
//     }, 1000);
  
//   }

//   eliminarTarea(obj: ActividadUsuario) {
//     console.log(obj);

//     Swal.fire({
//       title: `¿Está seguro de eliminar el archivo ${obj.descripcion}?`,
//       text: "Una vez eliminado no se podrá revertir",
//       width: 500,
//       buttonsStyling: false,
//       cancelButtonText: 'Cancelar',
//       confirmButtonText: 'Aceptar',
//       customClass: {
//         confirmButton: 'btn btn-success',
//         cancelButton: 'btn btn-danger'
//       },
//       // icon: 'warning',
//       imageUrl: "../../../../.././assets/img/warning-icon.png",
//       imageWidth: 80,
//       imageHeight: 80,
//       showCancelButton: true
//     }).then((result) => {
//       if (result.value) {
//         this.actividadService.eliminarTarea(obj.id).subscribe(
//           res => {
//             if (res === "ok") Swal.fire('¡Eliminado!', 'El archivo fue eliminado.', 'success')
//           },
//           err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
//           () => {
//             this.actividadesUsuarios = this.actividadesUsuarios.filter(a => a.id !== obj.id);
//             this.listarDocs();
//             this.listarImgs();
//           }
//         );
//       }
//     })
//   }

//   onFileChange(event) {
//     if (event.target.files && event.target.files[0]) {
//       var filesAmount = event.target.files.length;
//       for (let i = 0; i < filesAmount; i++) {
//         this.actividades = this.actividadUsuarioForm.get('actividades') as FormArray;
//         this.actividades.push(this._builder.group({
//           descripcion: null
//         }
//         ));
//         var reader = new FileReader();
//         reader.onload = (event: any) => {
//           this.files.push(event.target.result);
//         }
//         //UNA ALTERNATIVA SERÍA PONER EL MENU DE FOTOS Y DOCUMENTOS MÁS ARRIBA Y ASÍ LOS BOTONES
//         //Y LA FORMA DE SUBIR ARCHIVO SERIA DE ACUERDO A LA OPCIÓN QUE ELIJA EL USUARIO
//         // if(event.target.files[i].type==='application/pdf'){
//         //  let a= event.target.files[i]=null;
//         //   reader.readAsDataURL(a);
//         //   reader.result;
//         // }else{
//         reader.readAsDataURL(event.target.files[i]);
//         // }
//         this.fileUpload = Array.from(event.target.files);
//       }
//     }

//   }

//   quitarActividades(i: number) {
//     this.files.splice(i, 1);
//     this.actividades.value.splice(i,1);
//     this.actividades.controls.splice(i,1);
//     this.fileUpload.splice(i,1);
//     if(this.actividades.controls.length === 0){
//       this.validar();
//     }    
//   }


// }