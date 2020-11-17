import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnioEscolarRoutingModule } from '@pages/anios-escolares/anio-escolar-routing.module';

import { DataTablesModule  } from "angular-datatables";
import { CargaModule } from "@shared/carga/carga.module";

// componentes
import { AnioEscolarFormComponent } from './anio-escolar-form/anio-escolar-form.component';
import { AnioEscolarListComponent } from './anio-escolar-list/anio-escolar-list.component';
import { AnioEscolarComponent } from './anio-escolar.component';
import { FlujoService } from '@services/flujo.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';

@NgModule({
  declarations: [
    AnioEscolarComponent, 
    AnioEscolarFormComponent, 
    AnioEscolarListComponent
  ],
  imports: [
    CommonModule,
    AnioEscolarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    AnioEscolarService,
  ]
})
export class AnioEscolarModule { }
