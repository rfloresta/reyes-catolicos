import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';

@Component({
  selector: 'app-anio-escolar',
  templateUrl: './anio-escolar.component.html',
  styleUrls: ['./anio-escolar.component.css']
})
export class AnioEscolarComponent implements OnInit {
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
