import { NgModule, Component, ContentChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TurnoComponent } from 'src/app/admin/pages/turnos/turno.component';
import { InicioComponent } from 'src/app/pages/inicio/inicio.component';
import { IsAdminGuard } from "../guards/is-admin.guard";
import { DefaultComponent } from './default.component';

export const routes: Routes = [
  {//RUTAS SOLO PARA EL ADMIN
    path: '', component: DefaultComponent, canActivate:[IsAdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch:'full'},
      { path: 'dashboard', loadChildren: () => import('@pages/dashboard/dashboard.module').then(m => m.DashboardModule)},
      { path: 'dashboard/administracion/areas-curriculares', loadChildren: () => import('@pages/areas/area.module').then(m => m.AreaModule) },
      { path: 'dashboard/administracion/aulas', loadChildren: () => import('@pages/gestion-aulas/aulas/aula.module').then(m => m.AulaModule) },
      { path: 'dashboard/administracion/secciones', loadChildren: () => import('@pages/secciones/secciones.module').then(m => m.SeccionesModule) },
      { path: 'dashboard/usuarios', loadChildren: () => import('@pages/usuarios/usuario.module').then(m => m.UsuarioModule) },
      { path: 'dashboard/aulas', loadChildren: () => import('@pages/gestion-aulas/aulas/aula.module').then(m => m.AulaModule) },
      { path: 'dashboard/aulas-en-curso', loadChildren: () => import('@pages/gestion-aulas/aulas-en-curso/aulas-en-curso.module').then(m => m.AulasEnCursoModule) },
      { path: 'dashboard/aulas-en-curso/aula-en-curso', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/aula-en-curso.module').then(m => m.AulaEnCursoModule) },
      { path: 'dashboard/anios-escolares', loadChildren: () => import('@pages/anios-escolares/anio-escolar.module').then(m => m.AnioEscolarModule) },
      { path: 'dashboard/cambiar-password', loadChildren: () => import('../../pages/cambiar-password/cambiar-password.module').then(m => m.CambiarPasswordModule)    }
    ]
  },

  {//RUTA PARA OTROS USUARIOS
    path: '', component: DefaultComponent,
    children: [
      { path: '', redirectTo: 'inicio', pathMatch:'full'},
      { path: 'inicio', loadChildren: () => import('../../pages/inicio/inicio.module').then(m => m.InicioModule)},   
      { path: 'inicio/aula-en-curso', loadChildren: () => import('@pages/gestion-aulas/aula-en-curso/aula-en-curso.module').then(m => m.AulaEnCursoModule) }, 
     { path: 'inicio/cambiar-password', loadChildren: () => import('../../pages/cambiar-password/cambiar-password.module').then(m => m.CambiarPasswordModule)    },
      { path: '**', component: InicioComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DefaultRoutingModule { }
