import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SesionInforme } from '@models/SesionInforme';
import { ActividadService } from '@services/actividad/actividad.service';
import { SesionService } from '@services/sesion/sesion.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Img, PdfMakeWrapper, Stack, Table, Txt } from 'pdfmake-wrapper';
import { environment } from 'src/environments/environment';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import htmlToPdfmake from "html-to-pdfmake"

import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import * as pdfMake from 'pdfmake/build/pdfmake';
import { ImageService } from '@services/image.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-informe-modal',
  templateUrl: './informe-modal.component.html',
  styleUrls: ['./informe-modal.component.css']
})
export class InformeModalComponent implements OnInit, OnDestroy {

  informeForm: FormGroup;
  sesionInforme: SesionInforme;
  isImageLoading: boolean;
  constructor(private actividadService: ActividadService,
    public bsModalRef2: BsModalRef,
    private sesionService: SesionService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    (window as any).pdfMake.vfs = pdfFonts.pdfMake.vfs;
    this.validar();
  }

  validar() {
    this.informeForm = this._builder.group({
      fecha_inicio: [null, Validators.required],
      fecha_fin: [null, Validators.required]
    });
  }

  generarPdf() {
    if (this.informeForm.invalid) {
      return;
    }

    this.sesionInforme = this.informeForm.value;

    let fecha_inicio= moment(this.sesionInforme.fecha_inicio).format("YYYY-MM-DD HH:mm:ss");
    let fecha_fin= moment(this.sesionInforme.fecha_fin).format("YYYY-MM-DD HH:mm:ss");
console.log(this.sesionInforme);

     const pdf = new PdfMakeWrapper();
     let arr = new Array;
     this.sesionService.listarSesionesFecha(fecha_inicio, fecha_fin)
       .subscribe((res: SesionInforme[]) => {
         arr = res;
       }, err => 
       {       
        if(err.status === 400){
          this.toastr.warning(err.error);
        } 
        else{
          this.toastr.error(err.error);
          console.log(err);
        }
       },
         async () => {
           pdf.add(new Txt('INFORME DE EVIDENCIAS SEMANA N° ' + arr[0].numero).alignment('center').bold().end);
           pdf.add(
             pdf.ln(1)
           );
           for (let sesion of arr) {
             if (sesion.retro.length !== 0) {
               pdf.add(new Table([
                 ['Area', sesion.area],
                 ['Competencia', sesion.competencia],
                 ['Actividad', sesion.tema]
               ]).widths([100, '*']).end);
               pdf.add(
                 pdf.ln(1),
               );
               for (let retro of sesion.retro) {//Retroalimentación 
                 let foto: any = [];
                 let ex: any = [];
                 for (let img of retro.imgs) {
                   foto.push(await new Img(`${environment.API_URL}/${img.ruta_archivo}`).fit([200, 100]).build());
                 }
                 let expresar = [];
                 expresar.push(new Txt('3.-Expresar sus inquietudes: ').color('blue').bold().end);
                 for (let exp of retro.pasos.expresar) {
                   expresar.push(new Txt(exp.enunciado).end, new Txt(exp.respuesta).decoration("underline").end);
                 }
                 let aclarar = [];
                 let valorar = [];
                 let sugerir = [];
                 aclarar.push(new Txt('1.-Aclarar: ').color('blue').bold().width(-1000).end, new Txt(retro.pasos.aclarar.enunciado).end, new Txt(retro.pasos.aclarar.respuesta).decoration("underline").end);
                 valorar.push(new Txt('2.-Valorar: ').color('blue').bold().end, new Txt(retro.pasos.valorar.enunciado).end, new Txt(retro.pasos.valorar.respuesta).decoration("underline").end);
                 sugerir.push(new Txt('4.-Sugerir: ').color('blue').bold().end, new Txt(retro.pasos.sugerir.enunciado).end, new Txt(retro.pasos.sugerir.respuesta).decoration("underline").end);
                 pdf.add(new Stack([retro.estudiante, new Table([
                   [new Stack([foto]).headlineLevel("algo").end, new Stack([aclarar, valorar, expresar, sugerir]).alignment("justify").end]
                 ]).end,
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

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.informeForm.get(campo).errors.required) {
      mensaje = `La fecha es requerida`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.informeForm.get(campo).touched || this.informeForm.get(campo).dirty) &&
      !this.informeForm.get(campo).valid
    )
  }

  


  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();
  
    return new Promise((resolve, reject) => {
      var reader  = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);
  
      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }
  

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }


}