import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaFormComponent } from './area-form/area-form.component';
import { AreaComponent } from "./area.component";

const routes: Routes = [
  {
    path: '', component: AreaComponent,
    children: [
      { path: '', component: AreaListComponent },
      { path: 'form', component: AreaFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreaRoutingModule { }
