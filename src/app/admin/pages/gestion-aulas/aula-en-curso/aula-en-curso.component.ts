import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { Subscription  } from 'rxjs';
import { filter,pairwise } from 'rxjs/operators';
import { FlujoService } from 'src/app/services/flujo.service';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula-en-curso.component.html',
  styleUrls: ['./aula-en-curso.component.css']
})
export class AulaEnCursoComponent implements OnInit {
  accion: string;
  accionSuscription$: Subscription;
  aulaEnCurso: AulaEnCurso = {
    
  };
  aula_anio_id:string;
  path: string;
  path2: string;
  urlAnterior: string;
  usuario: UsuarioResponse;
  tipo: number;
  constructor( private flujoService: FlujoService,
    private aulaEnCursoService: AulaEnCursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { 

    }

  ngOnInit(): void {
    
    
    // this.router.events
    // .pipe(
    //   filter(event => event instanceof NavigationEnd))
    // .subscribe((e:any) => {
    //    console.log('prev:', this.urlAnterior);
    //    this.urlAnterior = e.url;
    //  });
    //  console.log("DOAOOAO",this.urlAnterior);

    // this.aula_anio_id=this.activatedRoute.snapshot.paramMap.get('aula_anio_id');
    
    let aula_anio_id = localStorage.getItem('ai');
    this.aulaEnCursoService.buscar(aula_anio_id).subscribe((res: AulaEnCurso)=> this.aulaEnCurso=res );

    this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);

    
    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;
    if(this.tipo===1 || this.tipo===2 ){
      this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas";
      this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/estudiantes";
    }else{
      this.path = "/principal/inicio/areas-curriculares/areas";
      this.path2 = "/principal/inicio/areas-curriculares/estudiantes";
    }

  }


  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }
  
}
