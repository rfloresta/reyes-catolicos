import { Component, OnInit } from '@angular/core';
import { FlujoService } from 'src/app/services/flujo.service';
declare var $:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private flujoService: FlujoService) { }

  ngOnInit(): void {
    $.getScript('../assets/js/init/initMenu.js');
  }
}
