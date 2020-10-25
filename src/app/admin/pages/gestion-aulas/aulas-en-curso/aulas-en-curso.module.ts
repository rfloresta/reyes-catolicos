import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AulaEnCursoRoutingModule } from '@pages/gestion-aulas/aulas-en-curso/aulas-en-curso-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { AulasEnCursoComponent } from './aulas-en-curso.component';
import { AulaEnCursoListComponent } from './aula-en-curso-list/aula-en-curso-list.component';
import { AulaEnCursoFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { AulaService } from '@services/aula/aula.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';

import { AulaEnCursoModule } from "@pages/gestion-aulas/aula-en-curso/aula-en-curso.module";

// import { TipoAulaService } from '@services/tipo-aula/tipo-aula.service';

@NgModule({
  declarations: [
    AulasEnCursoComponent, 
    AulaEnCursoFormComponent, 
    AulaEnCursoListComponent
  ],
  imports: [
    CommonModule,
    AulaEnCursoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule,
    AulaEnCursoModule
  ],
  providers:[
    FlujoService,
    AulaEnCursoService,
    AulaService,
    UsuarioService,
    AnioEscolarService
  ]
})
export class AulasEnCursoModule { }
