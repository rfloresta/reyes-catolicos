import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EstudianteComponent } from '@pages/gestion-aulas/aula-en-curso/estudiantes/estudiante.component';
import { EstudianteListComponent } from '@pages/gestion-aulas/aula-en-curso/estudiantes/estudiante-list/estudiante-list.component';
import { EstudianteFormComponent } from '@pages/gestion-aulas/aula-en-curso/estudiantes/estudiante-form/estudiante-form.component';

const routes: Routes = [
  {
    path: '', component: EstudianteComponent,
    children: [
      { path: '', component: EstudianteListComponent },
      { path: 'registrar', component: EstudianteFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
