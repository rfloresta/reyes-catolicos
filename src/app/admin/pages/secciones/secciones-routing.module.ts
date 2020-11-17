import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SeccionFormComponent } from './seccion-form/seccion-form.component';
import { SeccionListComponent } from './seccion-list/seccion-list.component';
import { SeccionesComponent } from './secciones.component';

const routes: Routes = [
  {
    path: '', component: SeccionesComponent,
    children: [
      { path: '', component: SeccionListComponent },
      { path: 'form', component: SeccionFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeccionesRoutingModule { }
