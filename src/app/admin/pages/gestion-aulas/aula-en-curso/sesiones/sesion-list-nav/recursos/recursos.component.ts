import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import * as moment from 'moment';
import { RecursoService } from '@services/recurso/recurso.service';
import { Sesion } from '@models/Sesion';
import { Recurso } from '@models/Recurso';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-recursos',
  templateUrl: './recursos.component.html',
  styleUrls: ['./recursos.component.css']
})
export class RecursosComponent implements OnInit {
  bsModalRef: BsModalRef;

  usuario: UsuarioResponse;
  tipo: number;
  @Input() recursosHijo: Recurso[] = [];
  @Input() sesionHijo: Sesion;
  @Input() tipoHijo: number;

  recurso: Recurso;

  accion: string;
  config = {
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  config2 = {
    ignoreBackdropClick: true
  };
  url: string=`${environment.API_URL}/`;
  cargando: boolean;
  constructor(private recursoService: RecursoService,
    private modalService: BsModalService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    moment.locale('es');

  }

  humanFormatStart(fecha: string) {        
    let fechaFormat = moment(fecha).format("YYYYMMDD HH:mm:ss");
    return moment(fechaFormat, "YYYYMMDD HH:mm:ss").fromNow();
  }

  refrescarLista(recursos: Recurso[]){
    this.cargando=true;
    setTimeout(() => {
      this.recursosHijo=recursos;
      this.cargando=false;

    }, 1000);
  }

  abrirModalRegistrar(template: TemplateRef<any>) {
    this.recurso = {
      id: null,
      titulo: null,
      contenido: null,
      formato_id: null,
      tipo_recurso_id: null
    }
    this.bsModalRef = this.modalService.show(template,this.config2);
    this.accion="Registrar";
  }

  abrirModalEditar(template: TemplateRef<any>,recurso: Recurso) {
    this.recurso=recurso;
    this.accion="Actualizar";
    this.bsModalRef = this.modalService.show(template, this.config2);
  }

  abrirModalArchivo(template: TemplateRef<any>,recurso: Recurso) {
    this.recurso=recurso;
    this.bsModalRef = this.modalService.show(template, this.config);
  }

  eliminar(obj: Recurso) {
    Swal.fire({
      title: `¿Está seguro de eliminar el recurso ${obj.titulo}?`,
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
        this.recursoService.eliminar(obj.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El recurso fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.recursosHijo = this.recursosHijo.filter(a => a.id !== obj.id);
          }
        );
      }
    })
  }

}
