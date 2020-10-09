import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  
  constructor( public flujoService: FlujoService
    ) { }

  ngOnInit(): void {
    this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion)
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }
  
}
