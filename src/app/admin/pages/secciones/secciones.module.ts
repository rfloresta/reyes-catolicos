import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule  } from "angular-datatables";
import { CargaModule } from "@shared/carga/carga.module";

// componentes
import { SeccionFormComponent } from './seccion-form/seccion-form.component';
import { SeccionListComponent } from './seccion-list/seccion-list.component';
import { SeccionesComponent } from './secciones.component';
import { FlujoService } from '@services/flujo.service';
import { SeccionService } from '@services/seccion/seccion.service';
import { SeccionesRoutingModule } from './secciones-routing.module';


@NgModule({
  declarations: [
    SeccionesComponent, 
    SeccionFormComponent, 
    SeccionListComponent
  ],
  imports: [
    CommonModule,
    SeccionesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    SeccionService
  ]
})
export class SeccionesModule { }
