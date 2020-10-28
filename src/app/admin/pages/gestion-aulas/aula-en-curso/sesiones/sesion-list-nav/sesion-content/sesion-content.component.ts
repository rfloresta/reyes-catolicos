import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { FlujoService } from 'src/app/services/flujo.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { Sesion } from '@models/sesion';
import { Actividad } from '@models/actividad';
import { Recurso } from '@models/recurso';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RecursoModalComponent } from '../recursos-modal/recurso-modal.component';

// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-sesion-content',
  templateUrl: './sesion-content.component.html',
  styleUrls: ['./sesion-content.component.css']
})
export class SesionContentComponent implements OnInit {
  bsModalRef: BsModalRef;

  usuario: UsuarioResponse;
  tipo: number;
  @Input() actividadesHijo: Actividad[] = [];
  @Input() recursosHijo: Recurso[] = [];
  @Input() sesionHijo: Sesion;

  recurso: Recurso={
    id: null,
        titulo: null,
        contenido: null,
        formato_id: null,
        tipo_recurso_id: null
  };
  time: string;
  time_end: string;

  accion: string;

  constructor(private flujoService: FlujoService,
    private actividadService: ActividadService,
    private recursoService: RecursoService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    moment.locale('es');
    //hasta día
    // this.time_end=moment('20201024 03:00:00', "YYYYMMDD hh:mm:ss", true).endOf('dates').fromNow();
    //hasta hora
    // this.time_end=moment('02:40:00', "hh:mm:ss", true).endOf('hours').fromNow();
    //hasta minuto
    // this.time_end=moment('02:40:00', "hh:mm:ss", true).endOf('m').fromNow();
    //hasta seg
    // this.time_end=moment('02:38:00', "hh:mm:ss", true).endOf('s').fromNow();
    //
 
    // this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);


    // let usuarioString = localStorage.getItem('usuario');
    // this.usuario = JSON.parse(usuarioString);
    // this.tipo = this.usuario.tipo;

    // if(this.tipo===1 || this.tipo===2 ){
    //   this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso";
    //   this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/estudiantes";
    // }else{
    //   this.path = "/principal/inicio/areas-curriculares";
    //   this.path2 = "/principal/inicio/areas-curriculares/estudiantes";
    // }

    // this.recursoService.enviarRecurso$.subscribe((res: Recurso[])=> 
    // {
    //   this.recursosHijo=res;
    //   console.log('Res sesion-content->',res);
      
    // }
    // );

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

  refrescarLista(recursos: Recurso[]){
    this.recursosHijo=recursos;
  }

  abrirModalRegistrarRecurso(template: TemplateRef<any>) {
    this.bsModalRef = this.modalService.show(template);
    this.accion="Registrar";
    // const initialState = {
    //   title: 'Registrar Recurso',
    //   sesion: this.sesionHijo
    // };
    // this.bsModalRef = this.modalService.show(template);
  }

  abrirModalEditarRecurso(template: TemplateRef<any>,recurso: Recurso) {
    console.log('recurso->',recurso);
    this.recurso=recurso;
    this.accion="Actualizar";
    this.bsModalRef = this.modalService.show(template);
  }

}
