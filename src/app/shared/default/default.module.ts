import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DefaultRoutingModule } from './default-routing.module';
// import { SharedModule } from "../../shared.module";
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { ContentHeaderComponent } from '../layout/content-header/content-header.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';

import { QuillModule } from 'ngx-quill';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CambiarPasswordComponent } from 'src/app/pages/cambiar-password/cambiar-password.component';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
// Import pdfmake-wrapper and the fonts to use

@NgModule({
  declarations: [
    SidebarComponent,
    NavbarComponent,
    FooterComponent,
    ContentHeaderComponent,
    DefaultComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
  ],
  providers:[
    // AnioEscolarService
  ]
})
export class DefaultModule { }
