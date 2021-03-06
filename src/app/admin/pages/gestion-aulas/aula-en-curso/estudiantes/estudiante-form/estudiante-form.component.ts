import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AulaEnCursoEstudiante } from '@models/AulaEnCursoEstudiante';
import { Usuario } from "@models/Usuario";
import { UsuarioService } from '@services/usuario/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { AulaEnCursoEstudianteService } from '@services/aula-en-curso-estudiante/aula-en-curso-estudiante.service';
import { ActivatedRoute, Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-estudiante-form',
  templateUrl: './estudiante-form.component.html',
  styleUrls: ['./estudiante-form.component.css']
})
export class EstudianteFormComponent implements OnInit {
  
  aulaEnCursoEstudianteHijo: AulaEnCursoEstudiante ={
    
    estudiante_id: null,  
    aula_anio_id: null
  }

  aulaEnCursoEstudianteForm: FormGroup;

  estudiantes: Usuario[] = [];
  aula_anio_id: string;

  constructor(
      
    private aulaEnCursoEstudianteService: AulaEnCursoEstudianteService,
    private usuarioService: UsuarioService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    private router: Router) {  }

  ngOnInit(): void {
    this.usuarioService.listarEstudiantesSinAula().subscribe((res) => {
      setTimeout(() => {
        $('.selectpicker').selectpicker('refresh');
      }, 150);
    this.estudiantes=res;
    });

    this.validar();
    // this.flujoService.enviarBool(false);
  }

  onSubmit() {
    if(this.aulaEnCursoEstudianteForm.invalid){
      return;
    }
    this.aulaEnCursoEstudianteHijo = this.aulaEnCursoEstudianteForm.value;
    console.log(this.aulaEnCursoEstudianteHijo);
      this.registrar(this.aulaEnCursoEstudianteHijo);
  }

  validar(){
    
    let aula_anio_idS = localStorage.getItem('ai');   
      this.aulaEnCursoEstudianteForm = this._builder.group({
      estudiante_id: [this.aulaEnCursoEstudianteHijo.estudiante_id, Validators.required],
      aula_anio_id:  aula_anio_idS
    });
  }

  registrar(aulaEnCursoEstudiante: AulaEnCursoEstudiante) {
    console.log(aulaEnCursoEstudiante);
    this.aulaEnCursoEstudianteService.registrar(aulaEnCursoEstudiante).subscribe(
      res => {
        console.log(res);
        if(res){
          this.toastr.success("Estudiante(s) registrado(s) en el aula");
          this.router.navigate(['principal/dashboard/aulas-en-curso/aula-en-curso/estudiantes']);
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
    if(this.aulaEnCursoEstudianteForm.get(campo).errors.required){
      mensaje = `Debe elegir a un estudiante`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean{

    return (
      (this.aulaEnCursoEstudianteForm.get(campo).touched || this.aulaEnCursoEstudianteForm.get(campo).dirty) && 
      !this.aulaEnCursoEstudianteForm.get(campo).valid
    )
  }

    
  ngOnDestroy(): void {
  }


}
