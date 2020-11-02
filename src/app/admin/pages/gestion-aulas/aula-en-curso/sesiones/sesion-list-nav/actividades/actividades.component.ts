import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FlujoService } from 'src/app/services/flujo.service';
import { Sesion } from '@models/sesion';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActividadModalComponent } from '../actividades/actividad-modal/actividad-modal.component';
import Swal from 'sweetalert2';
import { ActividadService } from '@services/actividad/actividad.service';
import { Actividad } from '@models/actividad';

// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit {
  bsModalRef: BsModalRef;

  usuario: UsuarioResponse;
  tipo: number;
  @Input() actividadesHijo: Actividad[] = [];
  @Input() sesionHijo: Sesion;

  actividad: Actividad={
    id: null,
        titulo: null,
        archivo_adjunto: null,
        descripción: null,
        fecha_fin: null,
        fecha_inicio: null,
        sesion_id: null
  };

  accion: string;

  constructor(private flujoService: FlujoService,
    private actividadService: ActividadService,
    private activatedRoute: ActivatedRoute,
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

  humanFormatEnd(fecha: string) {
    let fechaFormat = moment(fecha).format("YYYYMMDD HH:mm:ss");
    return moment(fechaFormat, "YYYYMMDD HH:mm:ss").endOf('seconds').fromNow();
  }

  comprobarVigencia(fechaFin: string){
    let fechaFinFormat: string = moment(fechaFin).format("YYYYMMDD HH:mm:ss");
    let fechaFinFormat2 =  moment(fechaFinFormat,"YYYYMMDD HH:mm:ss");
    let fechaActualFormat2 = moment(moment().format("YYYYMMDD HH:mm:ss"),"YYYYMMDD HH:mm:ss");
    let result=fechaActualFormat2.isBefore(fechaFinFormat2);
    if(!result){
        let iconState: string;
        return iconState="_off";
    }
  }
  refrescarLista(actividades: Actividad[]){
    this.actividadesHijo=actividades;
  }

  abrirModalRegistrar(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
    this.accion="Registrar";
  }

  abrirModalEditar(template: TemplateRef<any>,actividad: Actividad) {
    this.actividad=actividad;
    this.accion="Actualizar";
    this.bsModalRef = this.modalService.show(template);
  }

  eliminar(obj: Actividad) {
    Swal.fire({
      title: `¿Está seguro de eliminar el actividad ${obj.titulo}?`,
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
        this.actividadService.eliminar(obj.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El actividad fue eliminada.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.actividadesHijo = this.actividadesHijo.filter(a => a.id !== obj.id);
          }
        );
      }
    })
  }

}
