import { NgModule, Component, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AreaComponent } from 'src/app/admin/pages/areas/area.component';
import { DashboardComponent } from 'src/app/admin/pages/dashboard/dashboard.component';
import { TurnoComponent } from 'src/app/admin/pages/turnos/turno.component';
import { CheckLoginGuard } from '../guards/check-login.guard';
import { DefaultComponent } from './default.component';


export const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'dashboard/administracion/areas', loadChildren: () => import('@pages/areas/area.module').then(m => m.AreaModule) },
      { path: 'dashboard/administracion/turnos', loadChildren: () => import('@pages/turnos/turno.module').then(m => m.TurnoModule) },
      { path: 'dashboard/usuarios', loadChildren: () => import('@pages/usuarios/usuario.module').then(m => m.UsuarioModule) },
      { path: 'dashboard/gestion-aulas/aulas', loadChildren: () => import('@pages/gestion-aulas/aulas/aula.module').then(m => m.AulaModule) },
      { path: 'dashboard/gestion-aulas/aulas-en-curso', loadChildren: () => import('@pages/gestion-aulas/aulas-en-curso/aula-en-curso.module').then(m => m.AulaEnCursoModule) },
      { path: 'dashboard/anios-escolares', loadChildren: () => import('@pages/anios-escolares/anio-escolar.module').then(m => m.AnioEscolarModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DefaultRoutingModule { }
