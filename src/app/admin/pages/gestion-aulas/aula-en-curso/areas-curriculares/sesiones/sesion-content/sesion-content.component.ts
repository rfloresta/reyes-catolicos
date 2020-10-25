import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription  } from 'rxjs';
import * as moment from 'moment';
import { FlujoService } from 'src/app/services/flujo.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { Sesion } from '@models/sesion';
import { Actividad } from '@models/actividad';
import { Recurso } from '@models/recurso';
import { map } from 'rxjs/operators';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-sesion-content',
  templateUrl: './sesion-content.component.html',
  styleUrls: ['./sesion-content.component.css']
})
export class SesionContentComponent implements OnInit {
  
  sesion_id:string;
  sesion: Sesion;
  usuario: UsuarioResponse;
  tipo: number;
  actividades: Actividad[] = [];
  recursos: Recurso[] = [];

  time: string;
  time_end: string;

  numero: string;

  constructor( private flujoService: FlujoService,
    private actividadService: ActividadService,
    private recursoService: RecursoService,
    private activatedRoute: ActivatedRoute,
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
    this.time_end=moment('02:38:00', "hh:mm:ss", true).endOf('s').fromNow();
    //

    this.numero=this.activatedRoute.snapshot.paramMap.get('numero');
    console.log('Numero->',this.numero);
    
    let sesionString = localStorage.getItem('sesion');
    this.sesion = JSON.parse(sesionString);
    //Listar Actividades
   


    this.actividadService.listar(this.numero)
    .subscribe((res: Actividad[])=> 
    {
      console.log('idAdcti=>',this.sesion.id);
      console.log('actividades=>',res);
     return this.actividades=res; 
    }
    );
    
    //Listar Recursos
    this.recursoService.listar(this.numero).subscribe((res: Recurso[])=> 
    {
      console.log('re=>',res);
     return this.recursos=res; 
    }
    );

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

  }

 humanFormat(fecha: string){
  return  moment(fecha, "YYYYMMDD hh:mm:ss").fromNow();
 }

  
}
