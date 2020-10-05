import { Component, OnInit } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
declare var $:any;
@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $.getScript('../../../../assets/js/init/initMenu.js');
   
  }

  

}
