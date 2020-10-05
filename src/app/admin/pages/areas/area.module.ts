import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AreaRoutingModule } from './area-routing.module';

// import { DataTablesModule  } from "angular-datatables";

// Components
import { AreaComponent } from "./area.component";
// import { ArticuloFormComponent } from "./articulo-form/articulo-form.component";
// import { ArticuloListComponent } from "./articulo-list/articulo-list.component";

// Services
// import { ArticuloService } from "../../../services/articulo/articulo.service";
// import { SubcategoriaService } from "../../../services/subcategoria/subcategoria.service";

// Shared
// import { CargaModule } from "../layout/content/carga/carga.module";

@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    FormsModule,
    ReactiveFormsModule
    // DataTablesModule,
    // CargaModule
  ],
  providers: [
    // ArticuloService,
    // SubcategoriaService
  ]
})
export class AreaModule { }
