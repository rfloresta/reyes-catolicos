import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { Usuario, UsuarioResponse } from 'src/app/models/Usuario';
import { FlujoService } from 'src/app/services/flujo.service';
import { ROUTES } from './sidebar-routes.config';
import { MenuType } from './sidebar.metadata';
declare var $: any;

@Component({
    selector: 'app-sidebar',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {

    constructor(private flujoService: FlujoService) { }
    usuarioSuscription$: Subscription;
    usuario: UsuarioResponse;
    tipo: number;

    public menuItems: any[];
    ngOnInit() {
        $.getScript('../../../../../assets/js/sidebar-moving-tab.js');

        let usuarioString = localStorage.getItem('usuario');
        this.usuario = JSON.parse(usuarioString);
        this.tipo = this.usuario.tipo;
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);

    }


}
