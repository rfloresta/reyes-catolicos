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
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { AnioEscolar } from '@models/AnioEscolar';
import { map } from 'rxjs/operators';

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
  anioId: number;
  aulas: Aula[] = [];
  profesores: Usuario[] = [];

  constructor(
      
    private aulaEnCursoService: AulaEnCursoService,
    private aulaService: AulaService,
    private usuarioService: UsuarioService,
    private flujoService: FlujoService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private anioEscolarService: AnioEscolarService) {  }

  ngOnInit(): void {
    this.aulaService.listar()
    .pipe(
      map((res) => res.filter(x => x.estado === 1)
      )
    )
    .subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
        this.aulas=res;
    });

    this.usuarioService.listarProfesores().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);      
      this.profesores=res;
    });

    this.aulaEnCursoSuscription$ = this.flujoService.enviarObjeto$
      .subscribe((res: AulaEnCurso) => {
        this.aulaEnCursoHijo = res;
      });

      this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accionHijo=accion)
      this.obtenerAnioid();
    this.validar();
  }

  onSubmit() {
    if(this.aulaEnCursoForm.invalid){
      return;
    }
    this.aulaEnCursoHijo = this.aulaEnCursoForm.value;
    this.aulaEnCursoHijo.usuario_id = Number(this.aulaEnCursoHijo.usuario_id);    
    if (this.aulaEnCursoHijo.id===null) {
      this.registrar(this.aulaEnCursoHijo);
    } else this.actualizar(this.aulaEnCursoHijo);
  }

  validar(){
      this.aulaEnCursoForm = this._builder.group({
      id: this.aulaEnCursoHijo.id,
      aula_id: [this.aulaEnCursoHijo.aula_id, Validators.required],
      usuario_id: [this.aulaEnCursoHijo.usuario_id, Validators.required],
      anio_id: this.anioId,
      aula_anio_usuario_id: this.aulaEnCursoHijo.aula_anio_usuario_id
    });
  }

  obtenerAnioid() {
    this.anioEscolarService.obtenerAnioActivo().subscribe(
      (res: AnioEscolar) => {        
          this.anioId = res.id;
          this.validar();

      },
      err => console.error(err)
    );
    
  }

  registrar(aulaEnCurso: AulaEnCurso) {
    this.aulaEnCursoService.registrar(aulaEnCurso).subscribe(
      res => {
        if(res){
          this.toastr.success("Nueva aula en curso registrada");
        }
      },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
      }
    )
  }

  actualizar(aula: AulaEnCurso) {    
    this.aulaEnCursoService.actualizar(aula).subscribe(
      res => {
        if (res === "ok")this.toastr.success('El aula en curso se actualizó correctamente')        
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
