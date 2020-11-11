import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { Cell, Columns, Img, Item, PdfMakeWrapper, Stack, Table, Toc, TocItem, Txt, Ul } from 'pdfmake-wrapper';
import pdfFonts from "pdfmake/build/vfs_fonts"; // fonts provided for pdfmake
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/sesion';
import { environment } from 'src/environments/environment';
import { ActividadTareaUsuario } from '@models/ActividadTareaUsuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { SesionInforme } from '@models/SesionInforme';
import { filter } from 'rxjs/operators';

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
    this.sesionService.listarSesionesFecha('2020-11-02', '2020-11-16')
      .subscribe((res: SesionInforme[]) => {
        arr = res;
        
      }, err => console.log(err),
        async () => {
        //   pdf.add(new Table([
        //     [
        //         new Txt('Column 1').bold().end,
        //         new Cell( new Txt('Column 2 with colspan').bold().end ).colSpan(2).end
        //     ],
        //     [
        //         new Txt('Column 1').bold().end,
        //         'Column 2',
        //         'Column 3'
        //     ]
        // ]).end);
          pdf.add(new Txt('INFORME DE EVIDENCIAS SEMANA N° '+arr[0].numero).alignment('center').bold().end);
        //Para separar Paginas
        //   pdf.add(
        //     new TocItem(
        //         new Txt('Second page').pageBreak('before').end
        //     ).tocStyle({ color: 'red' }).end
        // );

          //Añade elemento abajo de otro
          // pdf.add(new Stack([ 'Hello', 'world Stack' ]).end);

          // pdf.add(new Stack([ 'Hello', 'world Stack justify' ]).alignment('justify').end)
        
          pdf.add(
            pdf.ln(1)
        ); 
   
          for (let sesion of arr) {
            if(sesion.retro.length !==0){
              pdf.add(new Table([
                [ 'Area', sesion.area],
                [ 'Competencia', sesion.competencia],
                [ 'Actividad', sesion.tema]
            ]).widths([ 100, '*' ]).end); 
            
            pdf.add(
              pdf.ln(1),
              
          ); 
          pdf.add(new Table([
            [
              
            ]
        ]).end);
              for(let retro of sesion.retro){//Retroalimentación 
                let foto: any = [];         
                for (let img of retro.imgs) {
                  foto.push(await new Img(`${environment.API_URL}/${img.ruta_archivo}`).fit([50,100]).build());
                }
                pdf.add(new Columns([ new Stack([ retro.estudiante, new Columns(foto).width(100).end]).width(200).end, 
                new Stack([new Columns([new Txt('Aclarar: ').width(50).bold().end,new Txt(retro.pasos.aclarar.enunciado).end]).end,
                new Columns([new Txt('Valorar: ').width(50).bold().end,new Txt(retro.pasos.valorar.enunciado).end]).end,
                new Columns([new Txt('Expresar: ').width(55).bold().end,new Txt(retro.pasos.expresar.enunciado).end]).end,
                new Columns([new Txt('Sugerir: ').width(50).bold().end,new Txt(retro.pasos.sugerir.enunciado).end]).end,]).alignment("justify").width(310).end,
                

                // new Cell([ new Txt('Aclarar:').bold().end, 
                // new Txt(retro.pasos.aclarar.enunciado).bold().end,
                // new Txt(retro.pasos.aclarar.enunciado).bold().end,
                //   'Aclarar: '+retro.pasos.aclarar.enunciado+' '+retro.pasos.aclarar.respuesta+' Sugerir: '+retro.pasos.sugerir.enunciado+' '+retro.pasos.sugerir.respuesta+'Valorar: '+retro.pasos.valorar.enunciado+' '+retro.pasos.valorar.respuesta+'Expresar: '+retro.pasos.expresar.enunciado+' '+retro.pasos.expresar.respuesta])]).end);
                pdf.add(
                  pdf.ln(1)
              )
            ]).end);
              }
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
