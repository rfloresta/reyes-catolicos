import { Component, OnInit } from '@angular/core';
import { AnioEscolar } from '@models/AnioEscolar';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { FlujoService } from 'src/app/services/flujo.service';
declare var $:any;
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor(    private anioEscolarService: AnioEscolarService    ) { }
  anioEscolar: AnioEscolar={};
  ngOnInit(): void {
   
    
  }

  

}
