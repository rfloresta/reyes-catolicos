import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CambioPassword } from '@models/CambioPassword';
import { Usuario, UsuarioResponse } from '@models/Usuario';
import { LoginService } from '@services/auth/login.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CambiarPasswordValidar } from './cambiar-password-validar';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit, OnDestroy {
  passwordSuscription$: Subscription;
  passwordForm: FormGroup;
  cambioPassword: CambioPassword = {
    passwordNuevo: null
  };
  constructor(private usuarioService: UsuarioService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService
        ) {  }

  ngOnInit(): void {
    this.validar();
  }

  onSubmit() {
    if(this.passwordForm.invalid){
      return;
    }
    let usuarioString = localStorage.getItem('usuario');
    let usuario: UsuarioResponse = JSON.parse(usuarioString);
    this.cambioPassword = this.passwordForm.value;    
    this.usuarioService.cambiarPassword(usuario.id,this.cambioPassword).subscribe(
      res => {
        if (res === "ok"){
          setTimeout(() => {
            this.toastr.success('La contraseña se actualizó correctamente, vuelva a iniciar sesión');
          }, 500);
          this.loginService.logout();
        }else{
          this.toastr.error('Ha ocurrido un probema al cambiar la contraseña');
        }
      },
      err => {
        if(err.status===400){
          this.toastr.warning(err.error.mensaje);
        }else{
          this.toastr.error('Ha ocurrido un error inesperado');
        }
        console.log(err);
      }
    )
  }

  validar(){
      this.passwordForm = this._builder.group({
      passwordActual: [null, [Validators.required,Validators.minLength(8)]],
      passwordNuevo: [null, [Validators.required,Validators.minLength(8)]],
      confirmar: [null, [Validators.required,Validators.minLength(8)]]
    }, {
      // Here we create validators to be used for the group as a whole
      validator: CambiarPasswordValidar.matchPwds
    }
  );
    
  }


  mensajeError(campo: string): string{
   
    let mensaje: string;
    if(this.passwordForm.get(campo).errors.required){
      mensaje = `La contraseña es requerida`;
    }
    if (this.passwordForm.get(campo).hasError("minlength")){
      const minLength = this.passwordForm.get(campo).errors?.minlength.requiredLength;
      mensaje = `La contraseña debe ser mayor o igual a ${minLength} caracteres`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{
    return (
      (this.passwordForm.get(campo).touched || this.passwordForm.get(campo).dirty) && 
      !this.passwordForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.passwordSuscription$)
    this.passwordSuscription$.unsubscribe();
  }

  
}
