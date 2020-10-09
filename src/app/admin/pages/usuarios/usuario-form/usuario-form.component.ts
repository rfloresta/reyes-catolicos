import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { FlujoService } from 'src/app/services/flujo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { TipoUsuarioService } from 'src/app/services/tipo-usuario/tipo-usuario.service';
import { TipoUsuario } from 'src/app/models/TipoUsuario';
import { UsuarioComponent } from '../usuario.component';

declare var $:any;
@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {

  private validarEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private validarSoloLetras = /^[a-zA-Z ]*$/;
  private validarDni = /^([0-9]){8}$/;
  private validarFecha = /^\d{4}([\-/.])(0?[1-9]|1[1-2])\1(3[01]|[12][0-9]|0?[1-9])$/;
  
  accionHijo: string;
  usuarioHijo: Usuario;

  usuarioSuscription$: Subscription;
  accionSuscription$: Subscription;

  usuarioForm: FormGroup;

  tipoUsuarios: TipoUsuario[] = [];

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

    this.validar();
    
 
  }

  onSubmit() {
    if(this.usuarioForm.invalid){
      return;
    }
    this.usuarioHijo = this.usuarioForm.value;
    
    console.log(this.usuarioHijo.id);
    if (this.usuarioHijo.id===null) {
      this.registrar(this.usuarioHijo);
    } else this.actualizar(this.usuarioHijo);
  }

  validar(){
    
      this.usuarioForm = this._builder.group({
      id: this.usuarioHijo.id,
      dni: [this.usuarioHijo.dni, [Validators.required,Validators.pattern(this.validarDni)]],
      fecha_nacimiento: [this.usuarioHijo.fecha_nacimiento, [Validators.required, Validators.pattern(this.validarFecha)]],
      sexo: [this.usuarioHijo.sexo, Validators.required],
      primer_nombre: [this.usuarioHijo.primer_nombre, [Validators.required,Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      segundo_nombre: [this.usuarioHijo.segundo_nombre, [Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      apellido_materno: [this.usuarioHijo.apellido_materno, [Validators.minLength(2), Validators.pattern(this.validarSoloLetras)]],
      apellido_paterno: [this.usuarioHijo.apellido_paterno, [Validators.minLength(2),Validators.pattern(this.validarSoloLetras)]],
      tipo_usuario_id: [this.usuarioHijo.tipo_usuario_id, Validators.required],
      email: [this.usuarioHijo.email, [Validators.required, Validators.pattern(this.validarEmail)]],
      foto: this.usuarioHijo.foto
    });
    
  }

  registrar(usuario: Usuario) {
    console.log(usuario);
    this.usuarioService.registrar(usuario).subscribe(
      res => {
        if(res){
          console.log(res);
          
          this.toastr.success("Nuevo usuario registrado");
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.log(err);
      }
    )
  }

  actualizar(usuario: Usuario) {
    console.log("actualizar",usuario);
    
    this.usuarioService.actualizar(usuario).subscribe(
      res => {
        if (res === "ok")this.toastr.success('El usuario se actualizó correctamente')        
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
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
