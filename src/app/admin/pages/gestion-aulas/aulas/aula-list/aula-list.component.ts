import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Aula } from '@models/aula';
import { FlujoService } from '@services/flujo.service';
import { AulaService } from '@services/aula/aula.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-aula-list',
  templateUrl: './aula-list.component.html',
  styleUrls: ['./aula-list.component.css']
})
export class AulaListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Para la tabla
  aulasHijo: Aula[] = [];

  //Para el formulario
  aulaHijo: Aula = {
    id: null,
    capacidad: null,
    estado: null,
    nivel_id: null,
    grado_id: null,
    seccion_id: null,
    turno_id: null,
  };

  accionEstado: string = "Activa";

  cargando: boolean;

  constructor(private aulaService: AulaService,
    private flujoService: FlujoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Configuración de datatable

    this.dtOptions = {
      pagingType: "full_numbers",
      lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
      // responsive: true,
      pageLength: 3,
      language: {
        search: "_INPUT_",
        searchPlaceholder: "Buscar",
      }
    }

    // Listar aulas
    this.cargando = true;
    // (async () => {
    //   await this.delay(1000);
    this.aulaService.listar().subscribe(
      (res: Aula[]) => {
        setTimeout(() => {
          this.aulasHijo = res;
          this.dtTrigger.next();
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );
    // })();


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.aulaHijo);
    this.flujoService.enviarAccion("Registrar");

  }
  
  editar(aula: Aula) {
    this.flujoService.enviarObjeto(aula);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/administracion/aulas/form']);
  }

  eliminar(aula: Aula) {

    Swal.fire({
      title: `¿Está seguro de eliminar el aula ${aula.aula_join}?`,
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
        this.aulaService.eliminar(aula.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El aula fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.aulasHijo = this.aulasHijo.filter(a => a.id !== aula.id);
            this.rerender();
          }
        );
      }
    })
  }

  actualizarEstado(aula: Aula) {

    if (aula.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el aula ${aula.aula_join}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        aula.estado = (aula.estado - 1) * -1;
        this.aulaHijo = { estado: aula.estado }
        this.aulaService.actualizarEstado(aula.id, this.aulaHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El aula fue ${this.accionEstado}do`, 'success');
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
