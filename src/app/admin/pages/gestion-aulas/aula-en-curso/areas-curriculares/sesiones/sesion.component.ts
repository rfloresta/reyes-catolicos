import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription  } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/sesion';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-sesion',
  templateUrl: './sesion.component.html',
  styleUrls: ['./sesion.component.css']
})
export class SesionComponent implements OnInit {
  
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
  usuario: UsuarioResponse;
  tipo: number;
  time: string;
  time_end: string;
  constructor( private flujoService: FlujoService,
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 

    }

  ngOnInit(): void {
    
    this.cargando = true;
    this.area_aula_anio_id = localStorage.getItem('aaai');
    this.sesionService.listar(this.area_aula_anio_id).subscribe(
      (res: Sesion[]) => {
        setTimeout(() => {
          this.sesionesHijo = res;
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );
    
    // this.router.events
    // .pipe(
    //   filter(event => event instanceof NavigationEnd))
    // .subscribe((e:any) => {
    //    console.log('prev:', this.urlAnterior);
    //    this.urlAnterior = e.url;
    //  });
    //  console.log("DOAOOAO",this.urlAnterior);

    // this.area_aula_anio_id=this.activatedRoute.snapshot.paramMap.get('area_aula_anio_id');
    
    // let area_aula_anio_id = localStorage.getItem('aaai');
    
    // this.aulaEnCursoService.buscar(area_aula_anio_id).subscribe((res: AulaEnCurso)=> this.aulaEnCurso=res );

    // this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);

    
    // let usuarioString = localStorage.getItem('usuario');
    // this.usuario = JSON.parse(usuarioString);
    // this.tipo = this.usuario.tipo;

    

    // if(this.tipo===1 || this.tipo===2 ){
      this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones/";
    //   // this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones";
    // }else{
    //   this.path = "/principal/inicio/areas-curriculares";
    //   this.path2 = "/principal/inicio/areas-curriculares/estudiantes";
    // }
    let sesionString = localStorage.getItem('sesion');
    this.sesionHijo = JSON.parse(sesionString);

  }

  consultarSesion(sesion: Sesion){
    this.sesionHijo=sesion;
    // localStorage.removeItem('sesion');
    localStorage.setItem('sesion', JSON.stringify(sesion));
    this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones', sesion.numero]);
  }

  //Para destruir la suscripcion anterior al registrar
  // ngOnDestroy(): void {
  //   if(this.accionSuscription$)
  //   this.accionSuscription$.unsubscribe();
  // }
  
}
