import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CargaModule } from '@shared/carga/carga.module';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { ActividadService } from '@services/actividad/actividad.service';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        CarouselModule.forRoot(),
        CargaModule
    ],
    declarations: [
        DashboardComponent
    ],
    providers:[
        AulaEnCursoService
    ]
})

export class DashboardModule { }
