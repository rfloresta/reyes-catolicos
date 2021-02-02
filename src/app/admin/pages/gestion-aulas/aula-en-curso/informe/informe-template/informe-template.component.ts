import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { SesionInforme } from '@models/SesionInforme';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import * as pdfMake from 'pdfmake/build/pdfmake';
import { environment } from 'src/environments/environment';

import html2canvas, { Options } from 'html2canvas';
import { logging } from 'protractor';

@Component({
  selector: 'app-informe-template',
  templateUrl: './informe-template.component.html',
  styleUrls: ['./informe-template.component.css']
})
export class InformeTemplateComponent implements OnInit, OnDestroy {
  url: string;
  sesionInforme: SesionInforme[];
  imgs: [];
  constructor(   
  ) { }

  ngOnInit() {
    this.url = environment.API_URL+'/';
    this.sesionInforme = JSON.parse(localStorage.getItem('sesionInforme'));
    console.log(this.sesionInforme);
    
    this.imgs=this.sesionInforme[0].retro[0].imgs;
    
    console.log(this.imgs);

    this.generarPdf();
  }
  generarPdf() {
    const opts: Partial<Options> = {
      logging: false,
      allowTaint: true, useCORS: true
    };
    html2canvas(document.getElementById('informeId')).then(function (canvas) {
      
      var data = canvas.toDataURL();
      var docDefinition = {
       
          content: [{
              image: data,
              width: 500,
          }],
        };
      pdfMake.createPdf(docDefinition).download("Score_Details.pdf");
  },          );
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
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


}