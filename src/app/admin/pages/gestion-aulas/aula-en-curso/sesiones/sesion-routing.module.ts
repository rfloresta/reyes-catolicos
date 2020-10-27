import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionFormComponent } from './sesion-form/sesion-form.component';
import { SesionListNavComponent } from './sesion-list-nav/sesion-list-nav.component';
import { SesionComponent } from './sesion.component';

const routes: Routes = [
  {
    path: '', component: SesionComponent,
    children: [
      { path: '', component: SesionListNavComponent },
      { path: 'form', component: SesionFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }
