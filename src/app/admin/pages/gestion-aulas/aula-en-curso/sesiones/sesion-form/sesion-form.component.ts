import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Sesion } from '@models/Sesion';
import { FlujoService } from '@services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import * as moment from 'moment';


declare var $:any;
@Component({
  selector: 'app-sesion-form',
  templateUrl: './sesion-form.component.html',
  styleUrls: ['./sesion-form.component.css']
})
export class SesionFormComponent implements OnInit, OnDestroy {
  
  private numeroPositivo = /^[0-9]+$/;
  private validarFecha = /[0-9]{4}-[0-9]{2}-[0-9]{2}/;
  private validarLink = /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/;


  accionHijo: string;
  sesionHijo: Sesion;

  sesionSuscription$: Subscription;
  accionSuscription$: Subscription;

  sesionForm: FormGroup;
  area: any;
  constructor(
    private sesionService: SesionService,
    private flujoService: FlujoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {



    let areaString = localStorage.getItem('area');
    this.area = JSON.parse(areaString);

    // this.activatedRoute..subscribe(() => {
      this.sesionSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Sesion) => {
        this.sesionHijo = res;
      });
      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)


    this.validar();
    // });


  }

  onSubmit() {
    if(this.sesionForm.invalid){
      return;
    }
    this.sesionHijo = this.sesionForm.value;
    let fecha=moment(this.sesionHijo.fecha).format("YYYY-MM-DD hh:mm:ss");
    this.sesionHijo.fecha =fecha;
    if (this.sesionHijo.id===null) {  
      this.registrar(this.sesionHijo);
    } else this.actualizar(this.sesionHijo);
  }

  validar(){
    
    // this.sesionHijo.numero=parseInt(localStorage.getItem('nuevoNumero'));
      this.sesionForm = this._builder.group({
      id: this.sesionHijo.id,
      numero: [this.sesionHijo.numero, [Validators.required,Validators.pattern(this.numeroPositivo),Validators.pattern]],
      fecha: [this.sesionHijo.fecha, Validators.required],
      link: [this.sesionHijo.link, [Validators.pattern(this.validarLink)]],
      tema: [this.sesionHijo.tema, [Validators.required]],
      competencia: [this.sesionHijo.competencia, [Validators.required]],
      area_aula_anio_id: this.area.id
    });
    
  }

  registrar(sesion: Sesion) {
    this.sesionService.registrar(sesion).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("Nueva sesion registrada");
          this.router.navigate(['/principal/inicio/aula-en-curso/areas/sesiones']);

        } else {
          this.toastr.error('Hubo un error al registrar');
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

  actualizar(sesion: Sesion) {    
    this.sesionService.actualizar(sesion).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("El sesion se actualizó correctamente");
          this.router.navigate(['/principal/inicio/aula-en-curso/areas/sesiones']);
        } else {
          this.toastr.error('Hubo un error al actualizar');
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

  atras(){
    this.router.navigate(['/principal/inicio/aula-en-curso/areas/sesiones']);
  }

  mensajeError(campo: string): string{
   
    let mensaje: string;
    if(this.sesionForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }else if (this.sesionForm.get(campo).hasError('pattern')){
      mensaje = `Ingrese un campo ${campo} válido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{
    return (
      (this.sesionForm.get(campo).touched || this.sesionForm.get(campo).dirty) && 
      !this.sesionForm.get(campo).valid
    )
  }

  ngOnDestroy(): void {
    if(this.sesionSuscription$)
    this.sesionSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
