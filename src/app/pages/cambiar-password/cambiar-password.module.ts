import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// componentes
import { CambiarPasswordRoutingModule } from './cambiar-password-routing.module';
import { CambiarPasswordComponent } from './cambiar-password.component';
import { UsuarioService } from '@services/usuario/usuario.service';


@NgModule({
  declarations: [
    CambiarPasswordComponent
  ],
  imports: [
    CommonModule,
    CambiarPasswordRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    UsuarioService
  ]
})
export class CambiarPasswordModule { }
