import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Area } from '@models/area';
import { FlujoService } from '@services/flujo.service';
import { AreaService } from '@services/area/area.service';
import Swal from 'sweetalert2'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.css']
})
export class AreaListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Para la tabla
  areasHijo: Area[] = [];

  //Para el formulario
  areaHijo: Area = {
    id: null,
    nombre: null
  };

  accionEstado: string = "Activa";

  cargando: boolean;
  url: string = `${environment.API_URL}/`;
  constructor(private areaService: AreaService,
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

    // Listar areas
    this.cargando = true;
    // (async () => {
    //   await this.delay(1000);
    this.areaService.listar().subscribe(
      (res: Area[]) => {
        setTimeout(() => {
          this.areasHijo = res;
          this.dtTrigger.next();
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );
    // })();


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.areaHijo);
    this.flujoService.enviarAccion("Registrar");

  }
  
  editar(area: Area) {
    this.flujoService.enviarObjeto(area);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/administracion/areas-curriculares/form']);
  }

  eliminar(area: Area) {

    Swal.fire({
      title: `¿Está seguro de eliminar el area ${area.nombre}?`,
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
        this.areaService.eliminar(area.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El area fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.areasHijo = this.areasHijo.filter(a => a.id !== area.id);
            this.rerender();
          }
        );
      }
    })
  }

  actualizarEstado(area: Area) {

    if (area.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el area ${area.nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        area.estado = (area.estado - 1) * -1;
        this.areaHijo = { estado: area.estado }
        this.areaService.actualizarEstado(area.id, this.areaHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El area fue ${this.accionEstado}do`, 'success');
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
