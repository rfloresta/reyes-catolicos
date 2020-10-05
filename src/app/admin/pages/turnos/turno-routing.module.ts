import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { ArticuloFormComponent } from './articulo-form/articulo-form.component';
// import { ArticuloListComponent } from './articulo-list/articulo-list.component';
import { TurnoComponent } from "./turno.component";

const routes: Routes = [
  {
    path: '', component: TurnoComponent
    // children: [
    //   { path: '', component: ArticuloListComponent },
    //   { path: 'form', component: ArticuloFormComponent }
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnoRoutingModule { }
