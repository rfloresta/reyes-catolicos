import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SesionRoutingModule } from '@pages/gestion-aulas/aula-en-curso/sesiones/sesion-routing.module';
import { OwlDateTimeIntl, OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { CargaModule } from "@shared/carga/carga.module";
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { RatingModule } from 'ngx-bootstrap/rating';
import { QuillEditorModule } from 'ngx-quill-editor';
// componentes
// import { AulaFormComponent } from './aula-en-curso-form/aula-en-curso-form.component';
import { SesionComponent } from './sesion.component';
// import { AreaListComponent } from './area-list/area-list.component';
import { FlujoService } from '@services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { SesionFormComponent } from './sesion-form/sesion-form.component';
import { SesionListNavComponent } from './sesion-list-nav/sesion-list-nav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RecursoService } from '@services/recurso/recurso.service';
import { ActividadService } from '@services/actividad/actividad.service';
import { FormatoService } from '@services/formato/formato.service';
import { RecursoModalComponent } from './sesion-list-nav/recursos/recurso-modal/recurso-modal.component';
import { ActividadesComponent } from './sesion-list-nav/actividades/actividades.component';
import { RecursosComponent } from './sesion-list-nav/recursos/recursos.component';
import { ActividadModalFormComponent } from './sesion-list-nav/actividades/actividad-modal-form/actividad-modal-form.component';
import { ArchivoModalComponent } from './sesion-list-nav/recursos/archivo-modal/archivo-modal.component';
import { SafePipe } from '@shared/pipes/safe.pipe';
import { UploadService } from '@services/upload/upload.service';
import { ActividadModalContentComponent } from './sesion-list-nav/actividades/actividad-modal-content/actividad-modal-content.component';
import { DataTablesModule } from 'angular-datatables';
import { ForosComponent } from './sesion-list-nav/actividades/actividad-modal-content/foros/foros.component';
import { TareasComponent } from './sesion-list-nav/actividades/actividad-modal-content/tareas/tareas.component';
import { ArchivosEstudianteModalComponent } from './sesion-list-nav/actividades/actividad-modal-content/tareas/archivos-estudiante-modal/archivos-estudiante-modal.component';
import { ArchivosEstudianteComponent } from './sesion-list-nav/actividades/actividad-modal-content/tareas/archivos-estudiante/archivos-estudiante.component';
@NgModule({
  declarations: [
    SesionComponent,
    SesionFormComponent,
    SesionListNavComponent,
    ActividadesComponent,
    RecursosComponent,
    ActividadModalFormComponent,
    ActividadModalContentComponent,
    RecursoModalComponent,
    ArchivoModalComponent,
    SafePipe,
    ForosComponent,
    TareasComponent,
    ArchivosEstudianteModalComponent,
    ArchivosEstudianteComponent
    ],
  imports: [
    CommonModule,
    SesionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CargaModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    DataTablesModule,
    CarouselModule.forRoot(),
    RatingModule.forRoot(),
    QuillEditorModule
  ],
  providers:[
    FlujoService,
    SesionService,
    RecursoService,
    ActividadService,
    FormatoService,
    UploadService,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es'},
    {provide: OwlDateTimeIntl, useClass: SesionModule}, 
  ]
})
export class SesionModule extends OwlDateTimeIntl {

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
