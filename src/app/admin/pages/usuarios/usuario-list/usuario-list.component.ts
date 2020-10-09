import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Usuario } from 'src/app/models/Usuario';
import { FlujoService } from 'src/app/services/flujo.service';
import { UsuarioService } from 'src/app/services/usuario/usuario.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit, OnDestroy {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  //Para la tabla
  usuariosHijo: Usuario[] = [];

  //Para el formulario
  usuarioHijo: Usuario = {
    dni: null,
    persona_id: null,
    tipo_usuario_id: null,
    primer_nombre: null,
    segundo_nombre: null,
    apellido_paterno: null,
    apellido_materno: null,
    sexo: null
  };

  accionEstado: string = "Activa";

  cargando: boolean;

  constructor(private usuarioService: UsuarioService,
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

    // Listar usuarios
    this.cargando = true;
    // (async () => {
    //   await this.delay(1000);
    this.usuarioService.listar('todos').subscribe(
      (res: Usuario[]) => {
        setTimeout(() => {
          this.usuariosHijo = res;
          this.dtTrigger.next();
          this.cargando = false;
        }, 2000);
      },
      err => console.error(err)
    );
    // })();


    //Método para inicializar el registro
    this.flujoService.enviarObjeto(this.usuarioHijo);
    this.flujoService.enviarAccion("Registrar");

  }

  // delay(ms: number) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }


  editar(usuario: Usuario) {
    console.log(usuario);

    this.flujoService.enviarObjeto(usuario);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/usuarios/form']);
  }

  eliminar(usuario: Usuario) {

    Swal.fire({
      title: `¿Está seguro de eliminar al usuario ${usuario.primer_nombre}?`,
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
      imageUrl: "../../../../../assets/img/warning-icon.png",
      imageWidth: 80,
      imageHeight: 80,
      showCancelButton: true
    }).then((result) => {
      if (result.value) {
        this.usuarioService.eliminar(usuario.persona_id).subscribe(
          res => {
            if (res === "ok") Swal.fire('¡Eliminado!', 'El usuario fue eliminado.', 'success')
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.usuariosHijo = this.usuariosHijo.filter(p => p.persona_id !== usuario.persona_id);
            this.rerender();
          }
        );
      }
    })
  }

  actualizarEstado(usuario: Usuario) {

    if (usuario.estado === 1) this.accionEstado = "Inactiva";
    Swal.fire({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      width: 500,
      // icon: 'warning',
      imageUrl: "../../../../../assets/img/warning-icon.png",
      //instead of imageSize use imageWidth and imageHeight
      imageWidth: 80,
      imageHeight: 80,
      title: `¿Está seguro de ${this.accionEstado}r el usuario ${usuario.primer_nombre}?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      buttonsStyling: false,
      cancelButtonText: 'Cancelar',
      focusConfirm: true
    }).then((result) => {
      if (result.value) {
        usuario.estado = (usuario.estado - 1) * -1;
        this.usuarioHijo = { estado: usuario.estado }
        this.usuarioService.actualizarEstado(usuario.id, this.usuarioHijo).subscribe(res => {
          if (res === "ok") Swal.fire(`¡${this.accionEstado}do!`, `El usuario fue ${this.accionEstado}do`, 'success');
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
