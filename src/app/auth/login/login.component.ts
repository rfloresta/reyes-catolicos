import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouteReuseStrategy } from '@angular/router';
import { AnioEscolar } from '@models/AnioEscolar';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { pipe, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/models/Usuario';
import { LoginService } from 'src/app/services/auth/login.service';
import { FlujoService } from 'src/app/services/flujo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private validarEmail = /\S+@\S+\.\S+/;
  private suscription$: Subscription = new Subscription();

  usuario: Usuario = {
    email: "",
    password: ""
  };
  msgError: String;
  loginForm: FormGroup;
  cargando: boolean;

  constructor(private loginService: LoginService,
    private _builder: FormBuilder,
    private router: Router,
    private flujoService: FlujoService,
    private anioEscolarService: AnioEscolarService
  ) {
  }


  ngOnInit(): void {
    this.validar();
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }

    this.cargando = true;
    this.usuario = this.loginForm.value;

    this.suscription$ = this.loginService.login(this.usuario).subscribe((res) => {
      if (res) {
        this.anioEscolarService.obtenerAnioActivo().subscribe((res: AnioEscolar) => {
          setTimeout(() => {
            localStorage.setItem('anio_activo', JSON.stringify(res));
            this.router.navigate(["/principal"]);
            this.cargando = false;
          }, 1000)
        });
      }
    },
      err => {
        console.error(err);
        setTimeout(() => {
          if (err.status === 400) {
            this.msgError = "Email y/o contraseña incorrectos";
            this.cargando = false;
          }
        }, 1000);
      }
    );
  }

  validar() {
    this.loginForm = this._builder.group({
      email: [this.usuario.email, [Validators.required, Validators.pattern(this.validarEmail)]],
      password: [this.usuario.password, Validators.required]
    });
  }

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.loginForm.get(campo).errors.required) {
      mensaje = `El campo es requerido`;
    } else if (this.loginForm.get(campo).hasError('pattern')) {
      mensaje = `Ingrese un email válido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.loginForm.get(campo).touched || this.loginForm.get(campo).dirty) &&
      !this.loginForm.get(campo).valid
    )
  }

  ngOnDestroy(): void {
    this.suscription$.unsubscribe();
  }

}
