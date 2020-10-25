import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreasCurricularesComponent } from './areas-curriculares.component';
import { AreaListComponent } from './area-list/area-list.component';

const routes: Routes = [
  {
    path: '', component: AreasCurricularesComponent,
    children: [
      { path: '',  component: AreaListComponent},
      { path: 'sesiones', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/areas-curriculares/sesiones/sesion.module').then(m => m.SesionModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasCurricularesRoutingModule { }
