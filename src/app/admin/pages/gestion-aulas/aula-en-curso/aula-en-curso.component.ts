import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { Cell, Columns, Img, Item, Ol, PdfMakeWrapper, Stack, Table, Toc, TocItem, Txt, Ul } from 'pdfmake-wrapper';
// import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { SesionService } from '@services/sesion/sesion.service';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
(window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { InformeModalComponent } from './informe-modal/informe-modal.component';
// @ts-ignore
// Set the fonts to use
// PdfMakeWrapper.setFonts(pdfFonts);

// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-aula',
  templateUrl: './aula-en-curso.component.html',
  styleUrls: ['./aula-en-curso.component.css']
})
export class AulaEnCursoComponent implements OnInit {
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
  pdf: PdfMakeWrapper = new PdfMakeWrapper();

  constructor(private flujoService: FlujoService,
    private aulaEnCursoService: AulaEnCursoService,
    private sesionService: SesionService,
    private modalService: BsModalService
  ) {

  }

  ngOnInit(): void {
    this.aula_anio_id = localStorage.getItem('ai');
    this.aulaEnCursoService.buscar(this.aula_anio_id).subscribe((res: AulaEnCurso) => this.aulaEnCurso = res);
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
    // const initialState = {
    //  aula: this.actividadNieto,
    //  tipo: this.tipoVisnieto
    // };
    this.bsModalRef = this.modalService.show(InformeModalComponent, {ignoreBackdropClick: true});
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if (this.accionSuscription$)
      this.accionSuscription$.unsubscribe();
  }

}
