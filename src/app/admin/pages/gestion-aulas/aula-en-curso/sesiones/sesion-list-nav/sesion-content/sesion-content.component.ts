// import { Component, Input, OnInit, TemplateRef } from '@angular/core';
// import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
// import { UsuarioResponse } from '@models/Usuario';
// import { Subscription } from 'rxjs';
// import * as moment from 'moment';
// import { FlujoService } from 'src/app/services/flujo.service';
// import { ActividadService } from '@services/actividad/actividad.service';
// import { RecursoService } from '@services/recurso/recurso.service';
// import { Sesion } from '@models/sesion';
// import { Actividad } from '@models/actividad';
// import { Recurso } from '@models/recurso';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
// import Swal from 'sweetalert2';

// // import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

// @Component({
//   selector: 'app-sesion-content',
//   templateUrl: './sesion-content.component.html',
//   styleUrls: ['./sesion-content.component.css']
// })
// export class SesionContentComponent implements OnInit {
//   bsModalRef: BsModalRef;

//   usuario: UsuarioResponse;
//   tipo: number;
//   @Input() actividadesHijo: Actividad[] = [];
//   @Input() recursosHijo: Recurso[] = [];
//   @Input() sesionHijo: Sesion;

//   recurso: Recurso={
//     id: null,
//         titulo: null,
//         contenido: null,
//         formato_id: null,
//         tipo_recurso_id: null
//   };
//   time: string;
//   time_end: string;

//   accion: string;

//   constructor(private flujoService: FlujoService,
//     private actividadService: ActividadService,
//     private recursoService: RecursoService,
//     private activatedRoute: ActivatedRoute,
//     private modalService: BsModalService,
//     private router: Router
//   ) {

//   }

//   ngOnInit(): void {
//     moment.locale('es');
//   }

//   humanFormatStart(fecha: string) {
//     let fechaFormat = moment(fecha).format("YYYYMMDD HH:mm:ss");
//     return moment(fechaFormat, "YYYYMMDD HH:mm:ss").fromNow();
//   }

//   humanFormatEnd(fecha: string) {
//     let fechaFormat = moment(fecha).format("YYYYMMDD HH:mm:ss");
//     return moment(fechaFormat, "YYYYMMDD HH:mm:ss").endOf('seconds').fromNow();
//   }

//   comprobarVigencia(fechaFin: string){
//     let fechaFinFormat: string = moment(fechaFin).format("YYYYMMDD HH:mm:ss");
//     let fechaFinFormat2 =  moment(fechaFinFormat,"YYYYMMDD HH:mm:ss");
//     let fechaActualFormat2 = moment(moment().format("YYYYMMDD HH:mm:ss"),"YYYYMMDD HH:mm:ss");
//     let result=fechaActualFormat2.isBefore(fechaFinFormat2);
//     if(!result){
//         let iconState: string;
//         return iconState="_off";
//     }
//   }

//   refrescarLista(recursos: Recurso[]){
//     this.recursosHijo=recursos;
//   }

//   abrirModalRegistrarRecurso(template: TemplateRef<any>) {
//     this.bsModalRef = this.modalService.show(template);
//     this.accion="Registrar";
//   }

//   abrirModalEditarRecurso(template: TemplateRef<any>,recurso: Recurso) {
//     console.log('recurso->',recurso);
//     this.recurso=recurso;
//     this.accion="Actualizar";
//     this.bsModalRef = this.modalService.show(template);
//   }

//   eliminarRecurso(obj: Recurso) {
//     Swal.fire({
//       title: `¿Está seguro de eliminar el recurso ${obj.titulo}?`,
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
//         this.recursoService.eliminar(obj.id).subscribe(
//           res => {
//             if (res === "ok") Swal.fire('¡Eliminado!', 'El recurso fue eliminado.', 'success')
//           },
//           err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
//           () => {
//             this.recursosHijo = this.recursosHijo.filter(a => a.id !== obj.id);
//           }
//         );
//       }
//     })
//   }

// }
