import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaEnCursoListComponent } from './area-en-curso-list/area-en-curso-list.component';
import { AulaEnCursoComponent } from './aula-en-curso.component';

//routing

const routes: Routes = [
  {
    path: '', component: AulaEnCursoComponent,
    children: [
      { path: '', redirectTo:'areas' , pathMatch:'full' },
      { path: 'areas', component: AreaEnCursoListComponent },
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
