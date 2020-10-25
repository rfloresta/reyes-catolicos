import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-aulas-en-curso',
  templateUrl: './aulas-en-curso.component.html',
  styleUrls: ['./aulas-en-curso.component.css']
})
export class AulasEnCursoComponent implements OnInit {
  accion: string;
  // mostrar: boolean;

  accionSuscription$: Subscription;
  // mostrarSuscription$: Subscription;

  constructor( public flujoService: FlujoService
    ) { }

  ngOnInit(): void {
    // this.mostrarSuscription$=this.flujoService.enviarBool$.subscribe((mostrar)=>this.mostrar=mostrar);
    this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
    // if(this.mostrarSuscription$)
    // this.mostrarSuscription$.unsubscribe();
  }
  
}
