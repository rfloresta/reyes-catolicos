import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { UsuarioResponse } from '@models/Usuario';
import * as moment from 'moment';
import { Sesion } from '@models/Sesion';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { ActividadService } from '@services/actividad/actividad.service';
import { Actividad } from '@models/Actividad';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';

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
  @Input() tipoHijo: number;

  actividad: Actividad = {};
  tarea: ActividadTareaUsuario;
  accion: string;
  estado: string;
  cargando: boolean;
  config = {
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };
  config2 = {
    ignoreBackdropClick: true
  };
  iconState: string;
  pruebaHtml: string;
  constructor(private actividadService: ActividadService,
    private modalService: BsModalService,
  ) {

  }

  ngOnInit(): void {
    moment.locale('es');
  }

  humanFormatStart(fecha: string): string {
    let fechaFormat = moment(fecha).format("YYYYMMDD HH:mm:ss");
    return moment(fechaFormat, "YYYYMMDD HH:mm:ss").fromNow();
  }

  humanFormatEnd(fechaInicio: string, fechaFin: string): string {
    let txtFecha = "...";
    if (fechaInicio !== null && fechaFin !== null) {
    let fechaInicioFormat = moment(fechaInicio).format("YYYYMMDD HH:mm:ss");
    let fechaInicioFormat2 = moment(fechaInicioFormat, "YYYYMMDD HH:mm:ss");
    let fechaFinFormat = moment(fechaFin).format("YYYYMMDD HH:mm:ss");
    let fechaFinFormat2 = moment(fechaFinFormat, "YYYYMMDD HH:mm:ss");

    let fechaActual = moment(moment().format("YYYYMMDD HH:mm:ss"), "YYYYMMDD HH:mm:ss");

    if (moment(fechaInicioFormat2).isValid() && moment(fechaFinFormat2).isValid()) {
      if (fechaActual.isBefore(fechaInicioFormat2)) {
        txtFecha = 'Abrirá ' + moment(fechaInicioFormat, "YYYYMMDD HH:mm:ss").startOf('seconds').fromNow();
      }else if (fechaActual.isBetween(fechaInicioFormat2, fechaFinFormat2) || fechaActual.isAfter(fechaFinFormat2)) {
        txtFecha = 'Cerrado ' + moment(fechaFinFormat, "YYYYMMDD HH:mm:ss").endOf('seconds').fromNow();
      } 
    }
  }else{
    txtFecha = 'Abierto en todo momento';
  }
    return txtFecha;
  }

  comprobarVigencia(fechaInicio: string, fechaFin: string) {
    // Hacer mejoras luego para estas instrucciones
    if (fechaInicio !== null && fechaFin !== null) {
      let fechaInicioFormat: string = moment(fechaInicio).format("YYYYMMDD HH:mm:ss");
      let fechaInicioFormat2 = moment(fechaInicioFormat, "YYYYMMDD HH:mm:ss");

      let fechaFinFormat: string = moment(fechaFin).format("YYYYMMDD HH:mm:ss");
      let fechaFinFormat2 = moment(fechaFinFormat, "YYYYMMDD HH:mm:ss");
      let fechaActual = moment(moment().format("YYYYMMDD HH:mm:ss"), "YYYYMMDD HH:mm:ss");

      let result2 = fechaActual.isBetween(fechaInicioFormat2, fechaFinFormat2);

      if (!result2) {
        let iconState: string;
        return iconState = "_off";
      }
    }

  }
  refrescarLista(actividades: Actividad[]) {
    this.cargando = true;
    setTimeout(() => {
      this.actividadesHijo = actividades;
      this.cargando = false;
    }, 1000);
  }

  abrirModalRegistrar(template: TemplateRef<any>) {
    this.actividad = {
      id: null,
      titulo: null,
      archivo_adjunto: null,
      descripcion: null,
      fecha_fin: null,
      fecha_inicio: null,
      sesion_id: null
    };
    this.accion = "Registrar";
    this.bsModalRef = this.modalService.show(template,this.config2);
  }

  abrirModalEditar(template: TemplateRef<any>, actividad: Actividad) {
    this.actividad = actividad;
    this.accion = "Actualizar";
    this.bsModalRef = this.modalService.show(template, this.config2);
  }

  abrirModalContent(template: TemplateRef<any>, actividad: Actividad) {
    this.actividad = actividad;
    this.estado = this.comprobarVigencia(actividad.fecha_inicio, actividad.fecha_fin);
    this.bsModalRef = this.modalService.show(template, this.config);
  }


  eliminar(obj: Actividad) {
    Swal.fire({
      title: `¿Está seguro de eliminar la actividad ${obj.titulo}?`,
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
            if (res === "ok") Swal.fire('¡Eliminado!', 'La actividad fue eliminada.', 'success')
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
