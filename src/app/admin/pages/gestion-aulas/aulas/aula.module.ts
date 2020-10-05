import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AulaRoutingModule } from '@pages/gestion-aulas/aulas/aula-routing.module';

import { DataTablesModule  } from "angular-datatables";
import { CargaModule } from "@shared/carga/carga.module";

// componentes
import { AulaFormComponent } from './aula-form/aula-form.component';
import { AulaListComponent } from './aula-list/aula-list.component';
import { AulaComponent } from './aula.component';
import { FlujoService } from '@services/flujo.service';
import { AulaService } from '@services/gestion-aula/aula/aula.service';
// import { TipoAulaService } from '@services/tipo-aula/tipo-aula.service';
import { ToastrModule } from 'ngx-toastr';
import { GradoService } from '@services/grado/grado.service';
import { NivelService } from '@services/nivel/nivel.service';
import { SeccionService } from '@services/seccion/seccion.service';
import { TurnoService } from '@services/turno/turno.service';


@NgModule({
  declarations: [
    AulaComponent, 
    AulaFormComponent, 
    AulaListComponent
  ],
  imports: [
    CommonModule,
    AulaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    AulaService,
    GradoService,
    NivelService,
    SeccionService,
    TurnoService
  ]
})
export class AulaModule { }
