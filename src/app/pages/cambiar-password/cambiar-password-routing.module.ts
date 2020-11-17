import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CambiarPasswordComponent } from './cambiar-password.component';
const routes: Routes = [
  {
    path: '', component: CambiarPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CambiarPasswordRoutingModule { }
