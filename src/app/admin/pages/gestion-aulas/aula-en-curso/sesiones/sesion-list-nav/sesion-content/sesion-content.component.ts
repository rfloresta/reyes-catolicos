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

    //Listar Actividades
    // this.actividadService.listar(this.sesionHijo.id)
    // .subscribe((res: Actividad[])=> 
    // {
    //   this.actividades=res; 
    // }
    // );

    // //Listar Recursos
    // this.recursoService.listar(this.sesionHijo.id).subscribe((res: Recurso[])=> 
    // {
    //   this.recursos=res; 
    // }
    // );

    // this.numero=this.activatedRoute.snapshot.paramMap.get('numero');



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

  humanFormat(fecha: string) {
    return moment(fecha, "YYYYMMDD hh:mm:ss").fromNow();
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

  abrirModalEditarRecurso(recurso: Recurso) {
    const initialState = {
      recurso,
      title: 'Editar Recurso'
    };
    this.bsModalRef = this.modalService.show(RecursoModalComponent, { initialState });
    this.bsModalRef.content.accion = 'Actualizar';
  }

}
