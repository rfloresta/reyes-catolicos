import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SesionRoutingModule } from '@pages/gestion-aulas/aula-en-curso/sesiones/sesion-routing.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CargaModule } from "@shared/carga/carga.module";
// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { SesionComponent } from './sesion.component';
// import { AreaListComponent } from './area-list/area-list.component';
import { FlujoService } from '@services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { SesionFormComponent } from './sesion-form/sesion-form.component';
import { SesionListNavComponent } from './sesion-list-nav/sesion-list-nav.component';
import { SesionContentComponent } from './sesion-list-nav/sesion-content/sesion-content.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecursoService } from '@services/recurso/recurso.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoModalComponent } from './sesion-list-nav/recursos-modal/recurso-modal.component';
import { FormatoService } from '@services/formato/formato.service';

@NgModule({
  declarations: [
    SesionComponent,
    SesionFormComponent,
    SesionListNavComponent,
    SesionContentComponent,
    RecursoModalComponent 
    ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxPaginationModule
  ],
  providers:[
    FlujoService,
    SesionService,
    RecursoService,
    ActividadService,
    FormatoService
  ]
})
export class SesionModule { }
