import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AulaEnCursoFormComponent } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso-form/aula-en-curso-form.component';
import { AulaEnCursoListComponent } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso-list/aula-en-curso-list.component';
import { AulasEnCursoComponent } from '@pages/gestion-aulas/aulas-en-curso/aulas-en-curso.component';

const routes: Routes = [
  {
    path: '', component: AulasEnCursoComponent,
    children: [
      { path: '', component: AulaEnCursoListComponent },
      { path: 'form', component: AulaEnCursoFormComponent }
      // { path: 'aula-en-curso', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/aula-en-curso.module').then(m => m.AulaEnCursoModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulaEnCursoRoutingModule { }
