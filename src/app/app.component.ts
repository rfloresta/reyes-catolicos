import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
declare var $:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public appLayoutComponent: LoginComponent;
 
  isLogin: boolean = false;

  constructor(private router: Router){

  }

  ngOnInit(): void {
    
    //  $.getScript('../assets/js/init/initMenu.js');
    
  }
}
