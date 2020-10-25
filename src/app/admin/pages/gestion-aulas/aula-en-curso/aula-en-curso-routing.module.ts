import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaListComponent } from './area-list/area-list.component';
import { AulaEnCursoComponent } from './aula-en-curso.component';

const routes: Routes = [
  {
    path: '', component: AulaEnCursoComponent,
    children: [
      { path: 'areas', component: AreaListComponent },
      { path: 'estudiantes', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/estudiantes/estudiante.module').then(m => m.EstudianteModule) },
      { path: 'areas/sesiones', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/sesiones/sesion.module').then(m => m.SesionModule) }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulaEnCursoRoutingModule { }
