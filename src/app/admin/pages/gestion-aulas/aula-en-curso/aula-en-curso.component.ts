import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { Img, PdfMakeWrapper } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/sesion';
import { environment } from 'src/environments/environment';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { SesionInforme } from '@models/SesionInforme';

// Set the fonts to use
PdfMakeWrapper.setFonts(pdfFonts);

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
    private actividadService: ActividadService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas";
      this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/estudiantes";
    } else {
      this.path = "/principal/inicio/aula-en-curso/areas";
      this.path2 = "/principal/inicio/aula-en-curso/estudiantes";
    }

  }

  async generarPdf() {
    const pdf = new PdfMakeWrapper();
    let arr = new Array;
    pdf.add(this.aulaEnCurso.nombre_anio);
    pdf.add('INFORME DE EVIDENCIAS N° 23');
    pdf.add('A: GLORIA EDITH MEDINA LOAYZA');
    pdf.add('SUBDIRECTORA DE EDUC. PRIMARIA I.E. Nº 6092 “Los Reyes Católicos”');
    pdf.add(`DE: ${this.aulaEnCurso.profesor}`);
    pdf.add(`DOCENTE DEL ${this.aulaEnCurso.aula}`);
    pdf.add(`ASUNTO: DESARROLLO y EVIDENCIAS DE TRABAJO REMOTO DEL SERVICIO 
    EDUCATIVO NO PRESENCIAL`);
    this.sesionService.listarSesionesFecha('2020-11-02', '2020-11-16')
      .subscribe((res: SesionInforme[]) => {
        arr = res;
      }, err => console.log(err),
        async () => {
          for (let sesion of arr) {
            console.log(sesion.area);
            pdf.add(sesion.fecha);
            pdf.add(sesion.area);
            pdf.add(sesion.tema);
            for (let img of sesion.imgs) {
              pdf.add(await new Img(`${environment.API_URL}/${img.ruta_archivo}`).build())
            }
          }
           pdf.create().open();
        }
      );
  }


  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if (this.accionSuscription$)
      this.accionSuscription$.unsubscribe();
  }

}
