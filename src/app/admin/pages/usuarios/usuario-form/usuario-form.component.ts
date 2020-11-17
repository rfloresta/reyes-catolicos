import { AfterViewChecked, AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { FlujoService } from 'src/app/services/flujo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from 'src/app/models/TipoUsuario';
import { UsuarioComponent } from '../usuario.component';
import { environment } from 'src/environments/environment';

declare var $:any;
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  @ViewChild("file") file;

  private validarEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private validarSoloLetras = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  private validarDni = /^([0-9]){8}$/;
  // private validarFecha = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
  
  accionHijo: string;
  usuarioHijo: Usuario;

  usuarioSuscription$: Subscription;
  accionSuscription$: Subscription;

  usuarioForm: FormGroup;

  tipoUsuarios: TipoUsuario[] = [];
  fileUpload: File = null;
  img: string;
  url: string = `${environment.API_URL}/`;
  
  constructor(
    private usuarioService: UsuarioService,
    private tipoUsuarioService: TipoUsuarioService,
    private flujoService: FlujoService,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {

    
    this.tipoUsuarioService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.tipoUsuarios=res;
    });

    this.usuarioSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Usuario) => {
        this.usuarioHijo = res;
      });
      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)
      if(this.accionHijo === "Registrar"){
        this.img="../../../../../assets/img/placeholder.jpg";
      }else if(this.accionHijo === "Actualizar"){
        this.img=this.url+this.usuarioHijo.foto;
      }
    this.validar();
    
 
  }

  onSubmit() {
    if(this.usuarioForm.invalid){
      return;
    }
    let fi = this.file.nativeElement;
    if (fi.files && fi.files[0]) {
      this.fileUpload = fi.files[0];
    }
    let form = new FormData();
    this.usuarioHijo = this.usuarioForm.value;
    form.append('dni', this.usuarioHijo.dni);
    form.append('primer_nombre', this.usuarioHijo.primer_nombre);
    form.append('segundo_nombre', this.usuarioHijo.segundo_nombre);
    form.append('apellido_paterno', this.usuarioHijo.apellido_paterno);
    form.append('apellido_materno', this.usuarioHijo.apellido_materno);
    form.append('fecha_nacimiento', this.usuarioHijo.fecha_nacimiento);
    form.append('sexo', this.usuarioHijo.sexo.toString());
    form.append('email', this.usuarioHijo.email);
    form.append('tipo_usuario_id', this.usuarioHijo.tipo_usuario_id.toString());
    if(this.fileUpload !== null){
      form.append('foto', this.fileUpload);
    }
    if (this.usuarioHijo.id===null) {
      this.registrar(form);
    } else {
      form.append('persona_id', this.usuarioHijo.persona_id.toString());
      form.append('id', this.usuarioHijo.id.toString());
      form.append('password', this.usuarioHijo.password);
      this.actualizar(form)
    };
  }

  validar(){
    
      this.usuarioForm = this._builder.group({
      id: this.usuarioHijo.id,
      dni: [this.usuarioHijo.dni, [Validators.required,Validators.pattern(this.validarDni)]],
      fecha_nacimiento: [this.usuarioHijo.fecha_nacimiento, [Validators.required]],
      sexo: [this.usuarioHijo.sexo, Validators.required],
      primer_nombre: [this.usuarioHijo.primer_nombre, [Validators.required,Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      segundo_nombre: [this.usuarioHijo.segundo_nombre, [Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      apellido_materno: [this.usuarioHijo.apellido_materno, [Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      apellido_paterno: [this.usuarioHijo.apellido_paterno, [Validators.minLength(2),Validators.pattern(this.validarSoloLetras)]],
      tipo_usuario_id: [this.usuarioHijo.tipo_usuario_id, Validators.required],
      email: [this.usuarioHijo.email, [Validators.required, Validators.pattern(this.validarEmail)]],
      password: [null, [Validators.minLength(8)]],
      persona_id: this.usuarioHijo.persona_id
    });
    
  }

  registrar(form: FormData) {
    this.usuarioService.registrar(form).subscribe(
      res => {
        if(res==='ok'){
          this.toastr.success("Nuevo usuario registrado");
        }else{
          this.toastr.error('Hubo un problema al registrar');
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
    this.usuarioService.actualizar(form).subscribe(
      res => {
        if (res === "ok"){
          this.toastr.success('El usuario se actualizó correctamente')
        }else{
          this.toastr.error('Ha ocurrido un problema al actualizar');
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
    if(this.usuarioForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }else if (this.usuarioForm.get(campo).hasError('pattern')){
      mensaje = `Ingrese un ${campo} válido`;
    }
    if (this.usuarioForm.get(campo).hasError("minlength")){
      const minLength = this.usuarioForm.get(campo).errors?.minlength.requiredLength;
      mensaje = `El campo debe ser mayor o igual a ${minLength} caracteres`;
    // }else if (this.usuarioForm.get(campo).hasError('pattern')){
    //   mensaje=`El campo ${campo} debe estar en formato de Nuevos Soles`
    // }else if (this.usuarioForm.get(campo).hasError('max')){
    //   mensaje=`El campo ${campo} debe ser soo de 2 cifras`
    // }
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{

    return (
      (this.usuarioForm.get(campo).touched || this.usuarioForm.get(campo).dirty) && 
      !this.usuarioForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.usuarioSuscription$)
    this.usuarioSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
