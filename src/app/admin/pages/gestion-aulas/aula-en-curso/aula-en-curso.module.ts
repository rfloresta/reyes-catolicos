import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AulaEnCursoRoutingModule } from '@pages/gestion-aulas/aula-en-curso/aula-en-curso-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { AulaEnCursoComponent } from './aula-en-curso.component';
import { FlujoService } from '@services/flujo.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { AreaListComponent } from './area-list/area-list.component';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
@NgModule({
  declarations: [
    AulaEnCursoComponent,
    AreaListComponent
  ],
  exports:[
    AulaEnCursoComponent
  ],
  imports: [
    CommonModule,
    AulaEnCursoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    AulaEnCursoService,
    AulaEnCursoAreaService,
    UsuarioService
  ]
})
export class AulaEnCursoModule { }
