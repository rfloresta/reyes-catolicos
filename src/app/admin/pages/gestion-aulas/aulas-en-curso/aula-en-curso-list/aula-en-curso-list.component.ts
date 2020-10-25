import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { pipe, Subject } from 'rxjs';
import { FlujoService } from '@services/flujo.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import Swal from 'sweetalert2'
import { AulaEnCurso } from '@models/AulaEnCurso';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import { AnioEscolar } from '@models/AnioEscolar';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-aula-en-curso-list',
  templateUrl: './aula-en-curso-list.component.html',
  styleUrls: ['./aula-en-curso-list.component.css']
})
export class AulaEnCursoListComponent implements OnInit, OnDestroy {

  //Para la tabla
  aulasEnCursoHijo: AulaEnCurso[] = [];

  //Para el formulario
  aulaEnCursoHijo: AulaEnCurso = {
    id: null,
    aula_id: null,
    anio_id: null,
    estado: null,
    capacidad_actual: null
  };

  anioId: number= 0;

  accionEstado: string = "Activa";

  cargando: boolean;
  mostrar: boolean;

  constructor(private aulaEnCursoService: AulaEnCursoService,
    private anioEscolarService: AnioEscolarService,
    private flujoService: FlujoService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.cargando=true;
    this.anioEscolarService.obtenerAnioActivo()
    .pipe(
      switchMap((res: AnioEscolar) => this.aulaEnCursoService.listar(res.id))
    ).subscribe(
      (res: AulaEnCurso[]) => {
        setTimeout(() => {
          this.aulasEnCursoHijo = res;
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.aulaEnCursoHijo);
    this.flujoService.enviarAccion("Registrar");
    // this.flujoService.enviarBool(true);
    $.getScript('../../../../../../assets/js/init/initMenu.js');

  }


  editar(aulaEnCurso: AulaEnCurso) {
    console.log(aulaEnCurso);

    this.flujoService.enviarObjeto(aulaEnCurso);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/gestion-aulas/aulas-en-curso/form']);
  }

  eliminar(aulaEnCurso: AulaEnCurso) {

    Swal.fire({
      title: `¿Está seguro de eliminar al aula en curso ${aulaEnCurso.aula}?`,
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
        this.aulaEnCursoService.eliminar(aulaEnCurso.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El aula en curso fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.aulasEnCursoHijo = this.aulasEnCursoHijo.filter(a => a.id !== aulaEnCurso.id);
          }
        );
      }
    })
  }

  actualizarEstado(aulaEnCurso: AulaEnCurso) {

    if (aulaEnCurso.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el aula encurso ${aulaEnCurso.aula}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        aulaEnCurso.estado = (aulaEnCurso.estado - 1) * -1;
        this.aulaEnCursoHijo = { estado: aulaEnCurso.estado }
        this.aulaEnCursoService.actualizarEstado(aulaEnCurso.id, this.aulaEnCursoHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El aulaEnCurso fue ${this.accionEstado}do`, 'success');
          this.accionEstado = "Activa";
        }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
        );
      }
    })
  }

  irAula(aulaEnCurso: AulaEnCurso){
    localStorage.setItem('ai', aulaEnCurso.id.toString());
    this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas']);
  }
  
  // mostrarBarra(){
  //   this.flujoService.enviarBool(false);
  // }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
