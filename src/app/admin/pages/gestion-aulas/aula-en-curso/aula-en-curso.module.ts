import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AulaEnCursoRoutingModule } from '@pages/gestion-aulas/aula-en-curso/aula-en-curso-routing.module';

import { CargaModule } from "@shared/carga/carga.module";

// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { AulaEnCursoComponent } from './aula-en-curso.component';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { AreaEnCursoListComponent } from './area-en-curso-list/area-en-curso-list.component';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import { SesionService } from '@services/sesion/sesion.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ActividadService } from '@services/actividad/actividad.service';
import { InformeModalComponent } from './informe/informe-modal/informe-modal.component';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { ImageService } from '@services/image.service';
import { InformeTemplateComponent } from './informe/informe-template/informe-template.component';
@NgModule({
  declarations: [
    AulaEnCursoComponent,
    AreaEnCursoListComponent,
    InformeModalComponent,
    InformeTemplateComponent
  ],
  exports:[
    AulaEnCursoComponent
  ],
  imports: [
    CommonModule,
    AulaEnCursoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    CargaModule,
    ModalModule.forRoot()
  ],
  providers:[
    FlujoService,
    AulaEnCursoService,
    AulaEnCursoAreaService,
    SesionService,
    ActividadService,
    ImageService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: AulaEnCursoModule}
  ]
})
export class AulaEnCursoModule  extends OwlDateTimeIntl{

  /** A label for the up second button (used by screen readers).  */
  upSecondLabel = 'Añadir un segundo';

  /** A label for the down second button (used by screen readers).  */
  downSecondLabel = 'Disminuir un segundo';

  /** A label for the up minute button (used by screen readers).  */
  upMinuteLabel = 'Añadir un minuto';

  /** A label for the down minute button (used by screen readers).  */
  downMinuteLabel = 'Disminuir un minuto';

  /** A label for the up hour button (used by screen readers).  */
  upHourLabel = 'Añadir una hora';

  /** A label for the down hour button (used by screen readers).  */
  downHourLabel = 'Disminuir una hora';

  /** A label for the previous month button (used by screen readers). */
  prevMonthLabel = 'Mes anterior';

  /** A label for the next month button (used by screen readers). */
  nextMonthLabel = 'Mes siguiente';

  /** A label for the previous year button (used by screen readers). */
  prevYearLabel = 'Año anterior';

  /** A label for the next year button (used by screen readers). */
  nextYearLabel = 'Siguiente año';

  /** A label for the previous multi-year button (used by screen readers). */
  prevMultiYearLabel = 'Anteriores 21 años';

  /** A label for the next multi-year button (used by screen readers). */
  nextMultiYearLabel = 'Siguientes 21 años';

  /** A label for the 'switch to month view' button (used by screen readers). */
  switchToMonthViewLabel = 'Cambiar a vista de meses';

  /** A label for the 'switch to year view' button (used by screen readers). */
  switchToMultiYearViewLabel = 'Seleccionar mes y año';

  /** A label for the cancel button */
  cancelBtnLabel = 'Cancelar';

  /** A label for the set button */
  setBtnLabel = 'Aceptar';

  /** A label for the range 'from' in picker info */
  rangeFromLabel = 'Desde';

  /** A label for the range 'to' in picker info */
  rangeToLabel = 'Hasta';

  /** A label for the hour12 button (AM) */
  hour12AMLabel = 'AM';

  /** A label for the hour12 button (PM) */
  hour12PMLabel = 'PM';

}
