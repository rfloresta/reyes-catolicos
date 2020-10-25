import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';


@NgModule({
    imports: [
        CommonModule,
        InicioRoutingModule
    ],
    declarations: [
        InicioComponent
    ]
})

export class InicioModule { }
