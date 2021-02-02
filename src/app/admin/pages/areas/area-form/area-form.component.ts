import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Area } from '@models/area';
import { FlujoService } from '@services/flujo.service';
import { AreaService } from '@services/area/area.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit, OnDestroy {
  @ViewChild("file") file;
  accionHijo: string;
  areaHijo: Area;
  areaSuscription$: Subscription;
  accionSuscription$: Subscription;
  areaForm: FormGroup;
  fileUpload: File = null;
  img: string;
  url: string = `${environment.API_URL}/`;


  constructor(
    private areaService: AreaService,
    private flujoService: FlujoService,
    private _builder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.areaSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Area) => {
        this.areaHijo = res;
      });

    this.accionSuscription$ = this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo = accion)
    
    if(this.accionHijo === "Registrar"){
      this.img="../../../../../assets/img/placeholder.jpg";
    }else if(this.accionHijo === "Actualizar"){
      this.img=this.url+this.areaHijo.imagen;
    }

    this.validar();
  }

  onSubmit() {
    if (this.areaForm.invalid) {
      return;
    }

    //ve cambios del input contenido
    let fi = this.file.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileUpload = fi.files[0];
    }

    let form = new FormData();
    this.areaHijo = this.areaForm.value;
    form.append('nombre', this.areaHijo.nombre);
    if(this.fileUpload !== null){
      form.append('imagen', this.fileUpload);
    }
    if (this.areaHijo.id === null) {
      this.registrar(form);
    } else {
      form.append('id', this.areaHijo.id.toString());
      this.actualizar(form)
    }
  }

  validar() {

    this.areaForm = this._builder.group({
      id: this.areaHijo.id,
      nombre: [this.areaHijo.nombre, [Validators.required, Validators.minLength(2)]]
    });
  }

  registrar(form: FormData) {
    this.areaService.registrar(form).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("Nueva area registrada");
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

  actualizar(form: FormData) {
    this.areaService.actualizar(form).subscribe(
      res => {
        if (res === "ok") {
          this.toastr.success("El area se actualizó correctamente");
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

  mensajeError(campo: string): string {

    let mensaje: string;
    if (this.areaForm.get(campo).errors.required) {
      mensaje = `El campo es requerido`;
    }
    if (this.areaForm.get(campo).hasError("minlength")) {
      const minLength = this.areaForm.get(campo).errors?.minlength.requiredLength;
      mensaje = `El campo debe ser mayor o igual a ${minLength} caracteres`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {

    return (
      (this.areaForm.get(campo).touched || this.areaForm.get(campo).dirty) &&
      !this.areaForm.get(campo).valid
    )
  }


  ngOnDestroy(): void {
    if (this.areaSuscription$)
      this.areaSuscription$.unsubscribe();
    if (this.accionSuscription$)
      this.accionSuscription$.unsubscribe();
  }


}
