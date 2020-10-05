import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario/tipo-usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  accion: string;
  accionSuscription$: Subscription;
  
  constructor( public flujoService: FlujoService,
    public tipoUsuarioService: TipoUsuarioService,) { }

  ngOnInit(): void {
    this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion)
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }
  
}
