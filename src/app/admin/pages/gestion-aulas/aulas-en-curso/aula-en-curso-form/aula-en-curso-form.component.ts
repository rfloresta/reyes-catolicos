import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { Aula } from '@models/Aula';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { Usuario } from "@models/Usuario";
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { UsuarioService } from '@services/usuario/usuario.service';
import { AulaService } from '@services/aula/aula.service';
import { FlujoService } from '@services/flujo.service';
import { ToastrService } from 'ngx-toastr';

declare var $:any;
@Component({
  selector: 'app-aula-en-curso-form',
  templateUrl: './aula-en-curso-form.component.html',
  styleUrls: ['./aula-en-curso-form.component.css']
})
export class AulaEnCursoFormComponent implements OnInit {
  
  accionHijo: string;
  aulaEnCursoHijo: AulaEnCurso;

  aulaEnCursoSuscription$: Subscription;
  accionSuscription$: Subscription;

  aulaEnCursoForm: FormGroup;

  aulas: Aula[] = [];
  profesores: Usuario[] = [];

  constructor(
      
    private aulaEnCursoService: AulaEnCursoService,
    private aulaService: AulaService,
    private usuarioService: UsuarioService,
    private flujoService: FlujoService,
    private _builder: FormBuilder,
    private toastr: ToastrService) {  }

  ngOnInit(): void {

    this.aulaService.listar().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
        this.aulas=res;
    });

    this.usuarioService.listar('3').subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
      console.log(this.profesores);
      
    this.profesores=res;
    });

    this.aulaEnCursoSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: Aula) => {
        console.log(res);
        this.aulaEnCursoHijo = res;
        
      });

      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)

    this.validar();
  }

  onSubmit() {
    if(this.aulaEnCursoForm.invalid){
      return;
    }
    this.aulaEnCursoHijo = this.aulaEnCursoForm.value;
    if (this.aulaEnCursoHijo.id===null) {
      this.registrar(this.aulaEnCursoHijo);
    } else this.actualizar(this.aulaEnCursoHijo);
  }

  validar(){
      this.aulaEnCursoForm = this._builder.group({
      id: this.aulaEnCursoHijo.id,
      aula_id: [this.aulaEnCursoHijo.aula_id, Validators.required],
      usuario_id: [this.aulaEnCursoHijo.usuario_id, Validators.required],
      anio_id: 1
    });
    
  }

  registrar(aulaEnCurso: AulaEnCurso) {
    console.log(aulaEnCurso);
    this.aulaEnCursoService.registrar(aulaEnCurso).subscribe(
      res => {
        console.log(res);
        if(res){
          this.toastr.success("Nueva aula en curso registrada");
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
    if(this.aulaEnCursoForm.get(campo).errors.required){
      mensaje = `El campo es requerido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{

    return (
      (this.aulaEnCursoForm.get(campo).touched || this.aulaEnCursoForm.get(campo).dirty) && 
      !this.aulaEnCursoForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
    if(this.aulaEnCursoSuscription$)
    this.aulaEnCursoSuscription$.unsubscribe();
    if(this.accionSuscription$)
    this.accionSuscription$.unsubscribe();
  }


}
