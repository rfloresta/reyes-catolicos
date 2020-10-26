import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SesionContentComponent } from './sesion-content/sesion-content.component';
import { SesionListNavComponent } from './sesion-list-nav.component';

const routes: Routes = [
  {
    path: '', component: SesionListNavComponent,
    children: [
      { path: ':numero', component: SesionContentComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SesionListNavRoutingModule { }
