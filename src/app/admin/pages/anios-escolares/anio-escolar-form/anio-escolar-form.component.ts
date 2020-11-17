import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { AnioEscolar } from '@models/anioEscolar';
import { FlujoService } from '@services/flujo.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-anio-escolar-form',
  templateUrl: './anio-escolar-form.component.html',
  styleUrls: ['./anio-escolar-form.component.css']
})
export class AnioEscolarFormComponent implements OnInit {
  
  private validarFecha = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;

  accionHijo: string;
  anioEscolarHijo: AnioEscolar;

  anioEscolarSuscription$: Subscription;
  accionSuscription$: Subscription;

  anioEscolarForm: FormGroup;

  constructor(
    private anioEscolarService: AnioEscolarService,
    private flujoService: FlujoService,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {

    this.anioEscolarSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: AnioEscolar) => {
        console.log(res);
        this.anioEscolarHijo = res;
      });

      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)

    this.validar();
  }

  onSubmit() {
    if(this.anioEscolarForm.invalid){
      return;
    }
    this.anioEscolarHijo = this.anioEscolarForm.value;
    if (this.anioEscolarHijo.id===null) {
      this.registrar(this.anioEscolarHijo);
    } else this.actualizar(this.anioEscolarHijo);
  }

  validar(){
      this.anioEscolarForm = this._builder.group({
      id: this.anioEscolarHijo.id,
    // anio: [this.anioEscolarHijo.anio, [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],    
    nombre: [this.anioEscolarHijo.nombre],    
    fecha_inicio: [this.anioEscolarHijo.fecha_inicio,[Validators.required, Validators.pattern(this.validarFecha)]],
    fecha_fin: [this.anioEscolarHijo.fecha_fin,[Validators.required, Validators.pattern(this.validarFecha)]],
    });

  }

  registrar(anioEscolar: AnioEscolar) {
    console.log(anioEscolar);
    this.anioEscolarService.registrar(anioEscolar).subscribe(
      res => {
        console.log(res);
        if(res){
          this.toastr.success("Nueva Año Escolar registrado");
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  actualizar(anioEscolar: AnioEscolar) {
    console.log("actualizar",anioEscolar);
    
    this.anioEscolarService.actualizar(anioEscolar).subscribe(
      res => {
        if (res === "ok")this.toastr.success('El Año Escolar se actualizó correctamente')        
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  mensajeError(campo: string): string{
   
    let mensaje: string;
    if(this.anioEscolarForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }else if (this.anioEscolarForm.get(campo).hasError('pattern')){
      mensaje = `Ingrese una fecha válida`;
    }
    // if (this.anioEscolarForm.get(campo).hasError("minlength")){
    //   const minLength = this.anioEscolarForm.get(campo).errors?.minlength.requiredLength;
    //   mensaje = `Ingrese un año válido`;
    // }
    // if (this.anioEscolarForm.get(campo).hasError("maxlength")){
    //   const minLength = this.anioEscolarForm.get(campo).errors?.minlength.requiredLength;
    //   mensaje = `Ingrese un año válido`;
    // }
    return mensaje;
  }

  campoValido(campo: string): boolean{
    return (
      (this.anioEscolarForm.get(campo).touched || this.anioEscolarForm.get(campo).dirty) && 
      !this.anioEscolarForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.anioEscolarSuscription$)
    this.anioEscolarSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
