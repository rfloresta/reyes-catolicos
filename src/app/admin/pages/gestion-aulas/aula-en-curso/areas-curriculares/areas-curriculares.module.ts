import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreasCurricularesRoutingModule } from '@pages/gestion-aulas/aula-en-curso/areas-curriculares/areas-curriculares-routing.module';
import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { AreasCurricularesComponent } from './areas-curriculares.component';
import { AreaListComponent } from './area-list/area-list.component';
import { FlujoService } from '@services/flujo.service';

@NgModule({
  declarations: [
    AreasCurricularesComponent,
    AreaListComponent
    ],
  imports: [
    CommonModule,
    AreasCurricularesRoutingModule,
    CargaModule
  ],
  providers:[
    FlujoService
  ]
})
export class AreasCurricularesModule { }
