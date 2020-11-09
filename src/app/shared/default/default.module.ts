import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { DefaultRoutingModule } from './default-routing.module';
// import { SharedModule } from "../../shared.module";
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { ContentHeaderComponent } from '../layout/content-header/content-header.component';
import { FooterComponent } from '../layout/footer/footer.component';
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
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
