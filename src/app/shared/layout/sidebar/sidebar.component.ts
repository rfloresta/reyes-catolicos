import { Component, OnInit } from '@angular/core';
import { AnioEscolar } from '@models/AnioEscolar';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { LoginService } from '@services/auth/login.service';
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

    constructor(private flujoService: FlujoService, private aulaEnCursoService: AulaEnCursoService, private loginService: LoginService) { }
    usuarioSuscription$: Subscription;
    usuario: UsuarioResponse;
    tipo: number;
    pathAulaId: string;
    public menuItems: any[];
    ngOnInit() {
        $.getScript('../../../../../assets/js/sidebar-moving-tab.js');

        // this.flujoService.tipo$.subscribe(res => this.tipo = res);

        // this.tipo$=this.flujoService.getTipo$();
        // this.tipo$.subscribe(res => this.tipo = res);
        let usuarioString = localStorage.getItem('usuario');
        this.usuario = JSON.parse(usuarioString);
        this.tipo = this.usuario.tipo;
        if (this.tipo === 3 || this.tipo === 4) {
            this.aulaEnCursoService.obtenerId(this.usuario.id)
                .subscribe(
                    (res: AulaEnCurso) => {
                        localStorage.setItem('ai', res.id.toString());
                    },
                    err => console.error(err)
                );

        }
        this.menuItems = ROUTES.filter(menuItem => menuItem.menuType !== MenuType.BRAND);
    }

}
