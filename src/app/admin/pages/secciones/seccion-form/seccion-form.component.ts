import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FlujoService } from '@services/flujo.service';
import { ToastrService } from 'ngx-toastr';
import { SeccionService } from '@services/seccion/seccion.service';

import { Seccion } from '@models/Seccion';

declare var $:any;
@Component({
  selector: 'app-seccion-form',
  templateUrl: './seccion-form.component.html',
  styleUrls: ['./seccion-form.component.css']
})
export class SeccionFormComponent implements OnInit, OnDestroy {
  
  accionHijo: string;
  seccionHijo: Seccion;
  seccionSuscription$: Subscription;
  accionSuscription$: Subscription;
  seccionForm: FormGroup;
  secciones: Seccion[] = [];

  constructor(private flujoService: FlujoService,
    private seccionService: SeccionService,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {

    
   

    this.seccionSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Seccion) => {
        console.log(res);
        this.seccionHijo = res;
        
      });

      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)

    this.validar();
  }

  onSubmit() {
    if(this.seccionForm.invalid){
      return;
    }
    this.seccionHijo = this.seccionForm.value;
    if (this.seccionHijo.id===null) {
      this.registrar(this.seccionHijo);
    } else this.actualizar(this.seccionHijo);
  }

  validar(){
    
      this.seccionForm = this._builder.group({
      id: this.seccionHijo.id,
      nombre: [this.seccionHijo.nombre, Validators.required],
    });
    
  }

  registrar(seccion: Seccion) {
    console.log(seccion);
    this.seccionService.registrar(seccion).subscribe(
      res => {
        console.log(res);
        if(res === "ok"){
          this.toastr.success("Nueva sección registrada");
        }else{
          this.toastr.error('Ha ocurrido un probema al registrar');
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

  actualizar(seccion: Seccion) {    
    this.seccionService.actualizar(seccion).subscribe(
      res => {
        if (res === "ok"){
          this.toastr.success('La sección se actualizó correctamente') 
        }else{
          this.toastr.error('Ha ocurrido un probema al actualizar');
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

  mensajeError(campo: string): string{
   
    let mensaje: string;
    if(this.seccionForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }else if (this.seccionForm.get(campo).hasError('pattern')){
      mensaje = `Ingrese un ${campo} válido`;
    }
    if (this.seccionForm.get(campo).hasError("minlength")){
      const minLength = this.seccionForm.get(campo).errors?.minlength.requiredLength;
      mensaje = `El campo debe ser mayor o igual a ${minLength} caracteres`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{

    return (
      (this.seccionForm.get(campo).touched || this.seccionForm.get(campo).dirty) && 
      !this.seccionForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.seccionSuscription$)
    this.seccionSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
