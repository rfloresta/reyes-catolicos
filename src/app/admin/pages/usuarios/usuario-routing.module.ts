import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario.component';

const routes: Routes = [
  {
    path: '', component: UsuarioComponent,
    children: [
      { path: '', component: UsuarioListComponent },
      { path: 'form', component: UsuarioFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
