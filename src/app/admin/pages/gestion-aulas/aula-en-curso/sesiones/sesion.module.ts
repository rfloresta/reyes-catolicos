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

@NgModule({
  declarations: [
    SesionComponent,
    SesionFormComponent
    ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule
  ],
  providers:[
    FlujoService,
    SesionService
  ]
})
export class SesionModule { }
