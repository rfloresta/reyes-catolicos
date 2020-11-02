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
import { NgxPaginationModule } from 'ngx-pagination';
import { RecursoService } from '@services/recurso/recurso.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { FormatoService } from '@services/formato/formato.service';
import { RecursoModalComponent } from './sesion-list-nav/recursos/recurso-modal/recurso-modal.component';
import { ActividadesComponent } from './sesion-list-nav/actividades/actividades.component';
import { RecursosComponent } from './sesion-list-nav/recursos/recursos.component';
import { ActividadModalComponent } from './sesion-list-nav/actividades/actividad-modal/actividad-modal.component';
import { ArchivoModalComponent } from './sesion-list-nav/recursos/archivo-modal/archivo-modal.component';
import { SafePipe } from '@shared/pipes/safe.pipe';
import {FileInputAccessorModule} from "file-input-accessor";
import { UploadService } from '@services/upload/upload.service';
@NgModule({
  declarations: [
    SesionComponent,
    SesionFormComponent,
    SesionListNavComponent,
    ActividadesComponent,
    RecursosComponent,
    ActividadModalComponent,
    RecursoModalComponent,
    ArchivoModalComponent,
    SafePipe
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
    FormatoService,
    UploadService
  ]
})
export class SesionModule { }
