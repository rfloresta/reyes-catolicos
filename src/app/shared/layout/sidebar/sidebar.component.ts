import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { LoginService } from '@services/auth/login.service';
import { Subject, Subscription } from 'rxjs';
import { Usuario, UsuarioResponse } from 'src/app/models/Usuario';
import { FlujoService } from 'src/app/services/flujo.service';
import { environment } from 'src/environments/environment';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['./sidebar.component.css']

})

export class SidebarComponent implements OnInit {

    constructor(private loginService: LoginService,
        private router: Router
        ) { }
    usuarioSuscription$: Subscription;
    usuario: UsuarioResponse;
    tipo: number;
    pathAulaId: string;
    mostrar: boolean;
    url: string = `${environment.API_URL}/`;
    public menuItems: any[];
    ngOnInit() {
        this.mostrar=true;

        $.getScript('../../../../assets/js/sidebar-moving-tab.js');
        $.getScript('../../../../assets/js/init/initMenu.js');

        // this.flujoService.tipo$.subscribe(res => this.tipo = res);
        // this.tipo$=this.flujoService.getTipo$();
        // this.tipo$.subscribe(res => this.tipo = res);
        let usuarioString = localStorage.getItem('usuario');
        this.usuario = JSON.parse(usuarioString);
        this.tipo = this.usuario.tipo;
        // if (this.tipo === 3 || this.tipo === 4) {
        //     this.aulaEnCursoService.obtenerId(this.usuario.id)
        //         .subscribe(
        //             (res: AulaEnCurso) => {
        //                 localStorage.setItem('ai', res.id.toString());
        //             },
        //             err => console.error(err)
        //         );

        // }
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }
    logout(){
        this.loginService.logout();
        this.mostrar=false;
        // window.location.reload();
      }
    
      irCambiar(){
        let usuarioString = localStorage.getItem('usuario');
          let usuario: UsuarioResponse = JSON.parse(usuarioString);
          let tipo: number = usuario.tipo;
          if(tipo===1 || tipo===2){
            this.router.navigate(['/principal/dashboard/cambiar-password']);
          }else if(tipo===3 || tipo===4){
            this.router.navigate(['/principal/inicio/cambiar-password']);
          }
      }



}
