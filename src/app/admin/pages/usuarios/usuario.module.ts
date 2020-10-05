import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';

import { DataTablesModule  } from "angular-datatables";
import { CargaModule } from "../../../shared/carga/carga.module";

// componentes
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { UsuarioListComponent } from './usuario-list/usuario-list.component';
import { UsuarioComponent } from './usuario.component';
import { FlujoService } from 'src/app/services/flujo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario/tipo-usuario.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    UsuarioComponent, 
    UsuarioFormComponent, 
    UsuarioListComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    UsuarioService,
    TipoUsuarioService
  ]
})
export class UsuarioModule { }
