import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { CargaModule } from '@shared/carga/carga.module';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';


@NgModule({
    imports: [
        CommonModule,
        InicioRoutingModule,
        CarouselModule.forRoot(),
        CargaModule
    ],
    declarations: [
        InicioComponent
    ],
    providers:[
        AulaEnCursoService,
        AulaEnCursoAreaService
    ]
})

export class InicioModule { }
