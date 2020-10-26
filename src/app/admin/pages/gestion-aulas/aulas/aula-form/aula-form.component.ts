import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Aula } from '@models/aula';
import { FlujoService } from '@services/flujo.service';
import { AulaService } from '@services/aula/aula.service';
import { ToastrService } from 'ngx-toastr';
import { GradoService } from '@services/grado/grado.service';
import { SeccionService } from '@services/seccion/seccion.service';
import { NivelService } from '@services/nivel/nivel.service';
import { TurnoService } from '@services/turno/turno.service';
import { Grado } from '@models/Grado';
import { Nivel } from '@models/Nivel';
import { Turno } from '@models/Turno';
import { Seccion } from '@models/Seccion';

declare var $:any;
@Component({
  selector: 'app-aula-form',
  templateUrl: './aula-form.component.html',
  styleUrls: ['./aula-form.component.css']
})
export class AulaFormComponent implements OnInit, OnDestroy {
  
  accionHijo: string;
  aulaHijo: Aula;

  aulaSuscription$: Subscription;
  accionSuscription$: Subscription;

  aulaForm: FormGroup;

  grados: Grado[] = [];
  niveles: Nivel[] = [];
  turnos: Turno[] = [];
  secciones: Seccion[] = [];

  constructor(
    private aulaService: AulaService,
    private flujoService: FlujoService,
    private gradoService: GradoService,
    private seccionService: SeccionService,
    private nivelService: NivelService,
    private turnoService: TurnoService,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {

    
    this.gradoService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.grados=res;
    });

    this.seccionService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.secciones=res;
    });

    this.turnoService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.turnos=res;
    });

    this.nivelService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.niveles=res;
    });

    this.aulaSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Aula) => {
        console.log(res);
        this.aulaHijo = res;
        
      });

      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)

    this.validar();
  }

  onSubmit() {
    if(this.aulaForm.invalid){
      return;
    }
    this.aulaHijo = this.aulaForm.value;
    if (this.aulaHijo.id===null) {
      this.registrar(this.aulaHijo);
    } else this.actualizar(this.aulaHijo);
  }

  validar(){
    
      this.aulaForm = this._builder.group({
      id: this.aulaHijo.id,
      seccion_id: [this.aulaHijo.seccion_id, Validators.required],
      turno_id: [this.aulaHijo.turno_id, Validators.required],
      grado_id: [this.aulaHijo.grado_id, Validators.required],
      nivel_id: [this.aulaHijo.nivel_id, Validators.required],
      capacidad: [this.aulaHijo.capacidad, Validators.required]
    });
    
  }

  registrar(aula: Aula) {
    console.log(aula);
    this.aulaService.registrar(aula).subscribe(
      res => {
        console.log(res);
        if(res){
          this.toastr.success("Nueva aula registrada");
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  actualizar(aula: Aula) {
    console.log("actualizar",aula);
    
    this.aulaService.actualizar(aula).subscribe(
      res => {
        if (res === "ok")this.toastr.success('El aula se actualizó correctamente')        
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  mensajeError(campo: string): string{
   
    let mensaje: string;
    if(this.aulaForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }else if (this.aulaForm.get(campo).hasError('pattern')){
      mensaje = `Ingrese un ${campo} válido`;
    }
    if (this.aulaForm.get(campo).hasError("minlength")){
      const minLength = this.aulaForm.get(campo).errors?.minlength.requiredLength;
      mensaje = `El campo debe ser mayor o igual a ${minLength} caracteres`;
    // }else if (this.aulaForm.get(campo).hasError('pattern')){
    //   mensaje=`El campo ${campo} debe estar en formato de Nuevos Soles`
    // }else if (this.aulaForm.get(campo).hasError('max')){
    //   mensaje=`El campo ${campo} debe ser soo de 2 cifras`
    // }
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{

    return (
      (this.aulaForm.get(campo).touched || this.aulaForm.get(campo).dirty) && 
      !this.aulaForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.aulaSuscription$)
    this.aulaSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
