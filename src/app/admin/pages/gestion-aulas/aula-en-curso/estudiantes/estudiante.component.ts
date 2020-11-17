import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FlujoService } from 'src/app/services/flujo.service';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-aula',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class EstudianteComponent implements OnInit {
  
  aula_anio_id:string;
  path: string;
  path2: string;
  url: string;
  urlAnterior: string;
  usuario: UsuarioResponse;
  tipo: number;
  constructor( public flujoService: FlujoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
     
    // this.url=this.activatedRoute.snapshot['_routerState'].url;
    // console.log("/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/===?",this.url);

    // this.aula_anio_id=this.activatedRoute.snapshot.paramMap.get('aula_anio_id');
   
    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;

      this.path = "/principal/dashboard/aulas-en-curso/aula-en-curso/estudiantes";
      this.path2= "/principal/dashboard/aulas-en-curso/aula-en-curso/estudiantes/registrar";  
  
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
  }
  
}
