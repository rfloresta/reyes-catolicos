import { Component, OnDestroy, OnInit } from '@angular/core';
import { FlujoService } from '@services/flujo.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-area',
    templateUrl: 'area.component.html'
})

export class AreaComponent implements OnInit, OnDestroy{
    accion: string;
    accionSuscription$: Subscription;

    constructor( public flujoService: FlujoService) { }

    ngOnInit(){
        this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion)
    }

    ngOnDestroy(): void {
        if(this.accionSuscription$)
        this.accionSuscription$.unsubscribe();
      }
}
