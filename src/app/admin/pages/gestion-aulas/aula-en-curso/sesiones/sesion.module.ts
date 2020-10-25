import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SesionRoutingModule } from '@pages/gestion-aulas/aula-en-curso/sesiones/sesion-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { SesionComponent } from './sesion.component';
import { SesionContentComponent } from "./sesion-content/sesion-content.component";
// import { AreaListComponent } from './area-list/area-list.component';
import { FlujoService } from '@services/flujo.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { SesionService } from '@services/sesion/sesion.service';

@NgModule({
  declarations: [
    SesionComponent,
    SesionContentComponent
    ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule,
    NgxPaginationModule
  ],
  providers:[
    FlujoService,
    SesionService,
    ActividadService,
    RecursoService
  ]
})
export class SesionModule { }
