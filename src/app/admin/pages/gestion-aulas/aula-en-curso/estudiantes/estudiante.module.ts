import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EstudianteRoutingModule } from '@pages/gestion-aulas/aula-en-curso/estudiantes/estudiante-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { EstudianteComponent } from './estudiante.component';
import { EstudianteListComponent } from './estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from './estudiante-form/estudiante-form.component';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import { AulaEnCursoEstudianteService } from '@services/aula-en-curso-estudiante/aula-en-curso-estudiante.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { FlujoService } from '@services/flujo.service';

@NgModule({
  declarations: [
    EstudianteComponent, 
    EstudianteListComponent, 
    EstudianteFormComponent
  ],
  imports: [
    CommonModule,
    EstudianteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule
  ],
  providers:[ 
    FlujoService,
    AulaEnCursoAreaService,
    UsuarioService,
    AulaEnCursoEstudianteService
  ]
})
export class EstudianteModule { }
