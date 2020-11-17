import { Component, OnInit } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar-routes.config';
import { MenuType } from '../sidebar/sidebar.metadata';
import {Location} from '@angular/common';
import { LoginService } from 'src/app/services/auth/login.service';
import { NavigationEnd, Router } from '@angular/router';
import { Usuario, UsuarioResponse } from '@models/Usuario';
import { AnioEscolar } from '@models/AnioEscolar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // private listTitles: any[];
  // location: Location;
  usuario: UsuarioResponse;
  anioEscolar: AnioEscolar;
  constructor(private loginService: LoginService,
    private router: Router
    ) {
  }

  ngOnInit(){
      // this.listTitles = ROUTES.filter(listTitle => listTitle.menuType !== MenuType.BRAND);
      let anioString = localStorage.getItem('anio_activo');
    this.anioEscolar = JSON.parse(anioString);
    }

  

  // getTitle(){
  //     var title = this.location.prepareExternalUrl(this.location.path());
  //     return title.charAt(1).toUpperCase() + title.slice(2);
  // }
  // getPath(){
  //     console.log("esta es-:",this.location);
  //     return this.location.prepareExternalUrl(this.location.path());
  // }

}
