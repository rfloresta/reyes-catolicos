import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AreaRoutingModule } from './area-routing.module';

// Components
import { AreaComponent } from "./area.component";
import { DataTablesModule } from 'angular-datatables';
import { AreaService } from '@services/area/area.service';
import { CargaModule } from '@shared/carga/carga.module';
import { AreaListComponent } from './area-list/area-list.component';
import { AreaFormComponent } from './area-form/area-form.component';

@NgModule({
  declarations: [
    AreaComponent,
    AreaListComponent,
    AreaFormComponent
  ],
  imports: [
    CommonModule,
    AreaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers: [
    AreaService
  ]
})
export class AreaModule { }
