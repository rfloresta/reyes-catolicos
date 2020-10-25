import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionContentComponent } from './sesion-content/sesion-content.component';
import { SesionComponent } from './sesion.component';

const routes: Routes = [
  {
    path: '', component: SesionComponent,
    children: [
      { path: '', component: SesionContentComponent },
      { path: ':numero', component: SesionContentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionRoutingModule { }
