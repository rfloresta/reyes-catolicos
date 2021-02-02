import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

//Configuración de idioma
import localeEsPE from '@angular/common/locales/es-PE';
registerLocaleData(localeEsPE, 'es-PE');
// public 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

//routing
import { AppRoutingModule } from './app-routing.module';

//components
import { AppComponent } from './app.component';
// service
// import { FlujoService } from './services/flujo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
    // QuillModule.forRoot()
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-PE' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
