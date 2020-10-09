import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
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
