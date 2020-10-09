import { LOCALE_ID,NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Configuración de idioma
import { registerLocaleData } from '@angular/common';
import localeEsPE from '@angular/common/locales/es-PE';
registerLocaleData(localeEsPE, 'es-PE');

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AnioEscolarRoutingModule } from '@pages/anios-escolares/anio-routing.module';

import { DataTablesModule  } from "angular-datatables";
import { CargaModule } from "@shared/carga/carga.module";

// componentes
import { AnioEscolarFormComponent } from './anio-escolar-form/anio-escolar-form.component';
import { AnioEscolarListComponent } from './anio-escolar-list/anio-escolar-list.component';
import { AnioEscolarComponent } from './anio-escolar.component';
import { FlujoService } from '@services/flujo.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';

@NgModule({
  declarations: [
    AnioEscolarComponent, 
    AnioEscolarFormComponent, 
    AnioEscolarListComponent
  ],
  imports: [
    CommonModule,
    AnioEscolarRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CargaModule
  ],
  providers:[
    FlujoService,
    AnioEscolarService,
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ]
})
export class AnioEscolarModule { }
