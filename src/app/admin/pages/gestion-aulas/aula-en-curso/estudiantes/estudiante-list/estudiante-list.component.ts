import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { AulaEnCursoEstudianteService } from '@services/aula-en-curso-estudiante/aula-en-curso-estudiante.service';
import Swal from 'sweetalert2'
import { AulaEnCursoEstudiante } from '@models/AulaEnCursoEstudiante';
import { FlujoService } from '@services/flujo.service';
import { environment } from 'src/environments/environment';
import { UsuarioResponse } from '@models/Usuario';

@Component({
  selector: 'app-estudiante-list',
  templateUrl: './estudiante-list.component.html',
  styleUrls: ['./estudiante-list.component.css']
})
export class EstudianteListComponent implements OnInit, OnDestroy {

  //Para la tabla
  aulaEnCursoEstudiantesHijo: AulaEnCursoEstudiante[] = [];

  //Para el formulario
  aulaEnCursoEstudianteHijo: AulaEnCursoEstudiante = {
    aula_anio_id: null,
    estudiante_id: null,
    estado: null
  };

  accionEstado: string = "Activa";

  aula_anio_id: string;
  url: string = `${environment.API_URL}/`;
  usuario: UsuarioResponse;
  tipo: number;
  cargando: boolean;
  snap: RouterStateSnapshot;
  p: number = 1;

  constructor(private aulaEnCursoEstudianteService: AulaEnCursoEstudianteService,
    private flujoService: FlujoService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) { }

  urlTree: any;

  ngOnInit(): void {
    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;

    // Listar aulaEnCursos
    this.cargando = true;

    // this.aula_anio_id=this.activatedRouter.snapshot.params.aula_anio_id;    
    let aula_anio_id = localStorage.getItem('ai');
    this.aulaEnCursoEstudianteService.listar(aula_anio_id).subscribe(
      (res: AulaEnCursoEstudiante[]) => {
        setTimeout(() => {
          this.aulaEnCursoEstudiantesHijo = res;
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );

    // this.flujoService.enviarBool(false);
  }

  eliminar(aulaEnCursoEstudiante: AulaEnCursoEstudiante) {
    console.log(aulaEnCursoEstudiante);

    Swal.fire({
      title: `¿Está seguro de eliminar al estudiante ${aulaEnCursoEstudiante.estudiante} del aula?`,
      text: "Una vez eliminado no se podrá revertir",
      width: 500,
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar',
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      // icon: 'warning',
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.aulaEnCursoEstudianteService.eliminar(aulaEnCursoEstudiante.id, aulaEnCursoEstudiante.aula_anio_id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El estudiante fue eliminado del aula.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.aulaEnCursoEstudiantesHijo = this.aulaEnCursoEstudiantesHijo.filter(a => a.id !== aulaEnCursoEstudiante.id);
          }
        );
      }
    })
  }

  actualizarEstado(aulaEnCursoEstudiante: AulaEnCursoEstudiante) {
    if (aulaEnCursoEstudiante.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el estudiante ${aulaEnCursoEstudiante.estudiante} del aula?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        aulaEnCursoEstudiante.estado = (aulaEnCursoEstudiante.estado - 1) * -1;
        this.aulaEnCursoEstudianteHijo = { estado: aulaEnCursoEstudiante.estado }
        this.aulaEnCursoEstudianteService.actualizarEstado(aulaEnCursoEstudiante.id, this.aulaEnCursoEstudianteHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El estudiante fue ${this.accionEstado}do del aula`, 'success');
          this.accionEstado = "Activa";
        }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
        );
      }
    })
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
