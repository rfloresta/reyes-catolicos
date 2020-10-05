import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnioEscolarFormComponent } from '@pages/anios-escolares/anio-escolar-form/anio-escolar-form.component';
import { AnioEscolarListComponent } from '@pages/anios-escolares/anio-escolar-list/anio-escolar-list.component';
import { AnioEscolarComponent } from '@pages/anios-escolares/anio-escolar.component';

const routes: Routes = [
  {
    path: '', component: AnioEscolarComponent,
    children: [
      { path: '', component: AnioEscolarListComponent },
      { path: 'form', component: AnioEscolarFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnioEscolarRoutingModule { }
