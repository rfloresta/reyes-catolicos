import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AulaEnCursoRoutingModule } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { AulaEnCursoComponent } from './aula-en-curso.component';
import { AulaEnCursoListComponent } from './aula-en-curso-list/aula-en-curso-list.component';
import { AulaEnCursoFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { AulaService } from '@services/aula/aula.service';
import { UsuarioService } from '@services/usuario/usuario.service';

// import { TipoAulaService } from '@services/tipo-aula/tipo-aula.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AulaEnCursoComponent, 
    AulaEnCursoFormComponent, 
    AulaEnCursoListComponent
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
    AulaService,
    UsuarioService
  ]
})
export class AulaEnCursoModule { }
