import { NgModule, Component, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';


export const routes: Routes = [
  {
    path: '', component: InicioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InicioRoutingModule { }
