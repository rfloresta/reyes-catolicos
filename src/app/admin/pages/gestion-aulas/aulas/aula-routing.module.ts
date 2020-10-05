import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AulaFormComponent } from '@pages/gestion-aulas/aulas/aula-form/aula-form.component';
import { AulaListComponent } from '@pages/gestion-aulas/aulas/aula-list/aula-list.component';
import { AulaComponent } from '@pages/gestion-aulas/aulas/aula.component';

const routes: Routes = [
  {
    path: '', component: AulaComponent,
    children: [
      { path: '', component: AulaListComponent },
      { path: 'form', component: AulaFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AulaRoutingModule { }
