import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoginRoutingModule  } from "./login-routing.module";

//components
import { LoginComponent } from "./login.component";

// Services
import { LoginService } from "../../services/auth/login.service";
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';

@NgModule({
    declarations: [
        LoginComponent
      ],
      imports: [
        CommonModule,
        LoginRoutingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        LoginService,
        AnioEscolarService
      ]
})

export class LoginModule{}
