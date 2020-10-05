import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent } from '../../shared/layout/sidebar/sidebar.component';
import { NavbarComponent } from '../../shared/layout/navbar/navbar.component';
import { FooterComponent } from '../../shared/layout/footer/footer.component';
import { ContentHeaderComponent } from '../../shared/layout/content-header/content-header.component';
import { ContentComponent } from '../../shared/layout/content/content.component';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule
    ],
    declarations: [  
    DashboardComponent
    ]
})

export class DashboardModule{}
