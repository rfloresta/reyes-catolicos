import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Seccion } from '@models/Seccion';
import { FlujoService } from '@services/flujo.service';
import { SeccionService } from '@services/seccion/seccion.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-seccion-list',
  templateUrl: './seccion-list.component.html',
  styleUrls: ['./seccion-list.component.css']
})
export class SeccionListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Para la tabla
  seccionesHijo: Seccion[] = [];

  //Para el formulario
  seccionHijo: Seccion = {
    id: null,
    nombre: null
  };

  accionEstado: string = "Activa";

  cargando: boolean;

  constructor(private seccionService: SeccionService,
    private flujoService: FlujoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Configuración de datatable

    this.dtOptions = {
      pagingType: "full_numbers",
      // lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      // responsive: true,
      pageLength: 3,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }
    }

    // Listar seccions
    this.cargando = true;
    // (async () => {
    //   await this.delay(1000);
    this.seccionService.listar().subscribe(
      (res: Seccion[]) => {
        setTimeout(() => {
          this.seccionesHijo = res;
          this.dtTrigger.next();
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );
    // })();


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.seccionHijo);
    this.flujoService.enviarAccion("Registrar");

  }
  
  editar(seccion: Seccion) {
    console.log(seccion);

    this.flujoService.enviarObjeto(seccion);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/administracion/secciones/form']);
  }

  eliminar(seccion: Seccion) {

    Swal.fire({
      title: `¿Está seguro de eliminar la seccion ${seccion.nombre}?`,
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
        this.seccionService.eliminar(seccion.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'La seccion fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.seccionesHijo = this.seccionesHijo.filter(a => a.id !== seccion.id);
            this.rerender();
          }
        );
      }
    })
  }

  actualizarEstado(seccion: Seccion) {

    if (seccion.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el seccion ${seccion.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        seccion.estado = (seccion.estado - 1) * -1;
        this.seccionHijo = { estado: seccion.estado }
        this.seccionService.actualizarEstado(seccion.id, this.seccionHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El seccion fue ${this.accionEstado}do`, 'success');
          this.accionEstado = "Activa";
        }, err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) }
        );
      }
    })
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
