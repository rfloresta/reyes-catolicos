import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { SesionListNavComponent } from './sesion-list-nav.component';
import { SesionContentComponent } from "./sesion-content/sesion-content.component";
// import { AreaListComponent } from './area-list/area-list.component';
import { FlujoService } from '@services/flujo.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { SesionService } from '@services/sesion/sesion.service';
import { SesionListNavRoutingModule } from './sesion-list-nav-routing.module';

@NgModule({
  declarations: [
    SesionListNavComponent,
    SesionContentComponent
    ],
  imports: [
    CommonModule,
    SesionListNavRoutingModule,
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
export class SesionListNavModule { }
