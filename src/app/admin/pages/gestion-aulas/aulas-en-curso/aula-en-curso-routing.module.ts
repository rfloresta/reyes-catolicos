import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AulaEnCursoFormComponent } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso-form/aula-en-curso-form.component';
import { AulaEnCursoListComponent } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso-list/aula-en-curso-list.component';
import { AulaEnCursoComponent } from '@pages/gestion-aulas/aulas-en-curso/aula-en-curso.component';

const routes: Routes = [
  {
    path: '', component: AulaEnCursoComponent,
    children: [
      { path: '', component: AulaEnCursoListComponent },
      { path: 'form', component: AulaEnCursoFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulaEnCursoRoutingModule { }
