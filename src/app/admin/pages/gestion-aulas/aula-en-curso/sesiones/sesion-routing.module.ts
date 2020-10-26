import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionFormComponent } from './sesion-form/sesion-form.component';
import { SesionComponent } from './sesion.component';

const routes: Routes = [
  {
    path: '', component: SesionComponent,
    children: [
      { path: '',  loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/sesiones/sesion-list-nav/sesion-list-nav.module').then(m => m.SesionListNavModule) },
      { path: 'frm/guardar', component: SesionFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }
