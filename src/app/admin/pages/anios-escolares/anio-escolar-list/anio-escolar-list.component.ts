import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { AnioEscolar } from '@models/AnioEscolar';
import { FlujoService } from '@services/flujo.service';
import { AnioEscolarService } from '@services/anio-escolar/anio-escolar.service';
import Swal from 'sweetalert2'
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

declare var $:any;

@Component({
  selector: 'app-anio-escolar-list',
  templateUrl: './anio-escolar-list.component.html',
  styleUrls: ['./anio-escolar-list.component.css']
})
export class AnioEscolarListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Para la tabla
  aniosEscolaresHijo: AnioEscolar[] = [];

  //Para el formulario
  anioEscolarHijo: AnioEscolar = {
    id: null,
    anio: null,    
    fecha_inicio: null,
    fecha_fin: null,
    estado: null
  };
  
  cargando: boolean;

  constructor(private anioEscolarService: AnioEscolarService,
    private toastr: ToastrService,
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

    // Listar AnioEscolars
    this.cargando = true;
    // (async () => {
    //   await this.delay(1000);
    this.anioEscolarService.listar().subscribe(
      (res: AnioEscolar[]) => {
        setTimeout(() => {
        this.aniosEscolaresHijo = res;
          this.dtTrigger.next();
          this.cargando = false;
        }, 1000);
        
      },
      err => console.error(err)
    );
    // })();


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.anioEscolarHijo);
    this.flujoService.enviarAccion("Registrar");

  }

  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }


  editar(anioEscolar: AnioEscolar) {
    anioEscolar.fecha_inicio=moment(anioEscolar.fecha_inicio).format('YYYY-MM-DD');
    anioEscolar.fecha_fin=moment(anioEscolar.fecha_fin).format('YYYY-MM-DD');
    console.log(anioEscolar);

    this.flujoService.enviarObjeto(anioEscolar);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/anios-escolares/form']);
  }

  eliminar(anioEscolar: AnioEscolar) {

    let anio=moment(anioEscolar.fecha_inicio).format('YYYY');
    Swal.fire({
      title: `¿Está seguro de eliminar el año escolar ${anio}?`,
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
        this.anioEscolarService.eliminar(anioEscolar.id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El año escolar fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.aniosEscolaresHijo = this.aniosEscolaresHijo.filter(a => a.id !== anioEscolar.id);
            this.rerender();
          }
        );
      }
    })
  }

  actualizarEstado(estado: string, anioEscolar: AnioEscolar) {
    let anio=moment(anioEscolar.fecha_inicio).format('YYYY');
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      imageUrl: "../../../../.././assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de cambiar el estado del Año Escolar ${anio}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        this.anioEscolarHijo = { estado }
        this.anioEscolarService.actualizarEstado(anioEscolar.id, this.anioEscolarHijo).subscribe(res => {
          console.log(res);
          if (res === "ok") {
            Swal.fire(`¡Actualizado!`, `El Año Escolar fue actualizado`, 'success');
          }else{
            this.toastr.error('Ha ocurrido un error al actualizar el estado');
          }
        }, err => { 
          if(err.status===400){
            this.toastr.warning(err.error.mensaje);
          }else{
            this.toastr.error('Ha ocurrido un error inesperado');
          }
          console.log(err) 
        }
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
