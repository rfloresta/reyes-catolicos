import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Observable, Subscription  } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/Sesion';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit, OnDestroy {
  
  accion: string;
  accionSuscription$: Subscription;
  cargando: boolean;
  area_aula_anio_id:string;
  path: string;
  path2: string;
  urlAnterior: string;
  p: number = 1;
  sesionesHijo: Sesion[] = [];
  sesionHijo: Sesion = {};
  area: AulaEnCursoArea = {};
  usuario: UsuarioResponse;
  tipo: number;
  constructor( private flujoService: FlujoService,
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 

    }

  ngOnInit(): void {



 
      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion)

    let areaString = localStorage.getItem('area');
    this.area = JSON.parse(areaString);
    // this.consultarSesion();


    // this.flujoService.$itemValue.subscribe((val)=>{
    //   this.sesionHijo = JSON.parse(val);
    //   console.log('sesionHijo ->', this.sesionHijo);
    // });
    
   
   
    // this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);

    
    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;

    

    // if(this.tipo===1 || this.tipo===2 ){
      // this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones/";
    //   // this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones";
    // }else{
    //   this.path = "/principal/inicio/areas-curriculares";
    //   this.path2 = "/principal/inicio/areas-curriculares/estudiantes";
    // }
    
    
  }

  consultarSesion(){
    //Propiedad para comparar con la lista de sesiones y adignar la clase active
    // this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones/list";
    // this.sesionHijo=sesion;
    // localStorage.setItem('sesion', JSON.stringify(sesion));
    // this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones']);
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }
  
}
