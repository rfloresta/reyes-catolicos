import { Component, OnDestroy, OnInit } from '@angular/core';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
// import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InformeModalComponent } from './informe/informe-modal/informe-modal.component';

@Component({
  selector: 'app-aula',
  templateUrl: './aula-en-curso.component.html',
  styleUrls: ['./aula-en-curso.component.css']
})
export class AulaEnCursoComponent implements OnInit, OnDestroy {
  bsModalRef: BsModalRef;
  accion: string;
  accionSuscription$: Subscription;
  aulaEnCurso: AulaEnCurso = {

  };
  // sesiones:SesionInforme []=[];
  aula_anio_id: string;
  path: string;
  path2: string;
  urlAnterior: string;
  usuario: UsuarioResponse;
  tipo: number;
  imagenes = [];

  constructor(private flujoService: FlujoService,
    private aulaEnCursoService: AulaEnCursoService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit(): void {
    this.aula_anio_id = localStorage.getItem('ai');
    this.aulaEnCursoService.buscar(this.aula_anio_id).subscribe((res: AulaEnCurso) => {
      this.aulaEnCurso = res
      localStorage.setItem('cantidad_estudiantes', this.aulaEnCurso.cantidad_estudiantes.toString());
      localStorage.setItem('aula', this.aulaEnCurso.aula.toString());

    });
    this.accionSuscription$ = this.flujoService.enviarAccion$.subscribe((accion) => this.accion = accion);
    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;
    if (this.tipo === 1 || this.tipo === 2) {
      this.path = "/principal/dashboard/aulas-en-curso/aula-en-curso/areas";
      this.path2 = "/principal/dashboard/aulas-en-curso/aula-en-curso/estudiantes";
    } else {
      this.path = "/principal/inicio/aula-en-curso/areas";
      this.path2 = "/principal/inicio/aula-en-curso/estudiantes";
    }
  }

  abrirInformeModal() {
    this.bsModalRef = this.modalService.show(InformeModalComponent, {ignoreBackdropClick: true});
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if (this.accionSuscription$)
      this.accionSuscription$.unsubscribe();
  }

}
