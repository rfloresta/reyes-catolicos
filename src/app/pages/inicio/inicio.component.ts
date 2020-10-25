import { Component, OnInit } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
declare var $:any;
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private flujoService: FlujoService) { }

  ngOnInit(): void {
    $.getScript('../../../assets/js/init/initMenu.js');
  }
}
