import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/Sesion';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import Swal from 'sweetalert2';
import { ActividadService } from '@services/actividad/actividad.service';
import { RecursoService } from '@services/recurso/recurso.service';
import { Actividad } from '@models/Actividad';
import { Recurso } from '@models/Recurso';

@Component({
  selector: 'app-sesion-list-nav',
  templateUrl: './sesion-list-nav.component.html',
  styleUrls: ['./sesion-list-nav.component.css']
})
export class SesionListNavComponent implements OnInit, OnDestroy {

  accion: string;
  accionSuscription$: Subscription;
  cargando: boolean;
  cargando2: boolean;
  objetoValido: boolean;
  area_aula_anio_id: string;
  path: string;
  path2: string;
  urlAnterior: string;
  sesionesHijo: Sesion[] = [];
  p: number = 1;

  sesion: Sesion = {};
  sesionFrm: Sesion = {
    id: null,
    numero: null,
    fecha: null,
    link: null,
    tema: null,
    area_aula_anio_id: null
  };
  actividades: Actividad[] = [];
  recursos: Recurso[] = [];
  areaEnCurso: AulaEnCursoArea = {};
  usuario: UsuarioResponse;
  tipo: number;
  time: string;
  time_end: string;

  // @ViewChild('sesionContent', { static: false }) sesionContent: SesionContentComponent;


  constructor(private flujoService: FlujoService,
    private sesionService: SesionService,
    private actividadService: ActividadService,
    private recursoService: RecursoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.listarSesiones();
    // this.p=this.sesionesHijo.length;
    this.sesionService.obtenerSesionActual(this.areaEnCurso.id)
      .subscribe((res: Sesion) => {
        this.consultarSesion(res);
      },
        err => console.error(err)
      );

    this.flujoService.enviarObjeto(this.sesionFrm);
    this.flujoService.enviarAccion("Registrar");
    this.recursoService.enviarRecurso$.subscribe((res: Recurso[]) => {
      this.recursos = res;
    }
    );


    // this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);


    let usuarioString = localStorage.getItem('usuario');
    this.usuario = JSON.parse(usuarioString);
    this.tipo = this.usuario.tipo;



    // if(this.tipo===1 || this.tipo===2 ){
    // this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areaEnCursos/sesiones/";
    //   // this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areaEnCursos/sesiones";
    // }else{
    //   this.path = "/principal/inicio/areaEnCursos-curriculares";
    //   this.path2 = "/principal/inicio/areaEnCursos-curriculares/estudiantes";
    // }

  }

  listarSesiones() {
    let areaEnCursoString = localStorage.getItem('area');
    this.areaEnCurso = JSON.parse(areaEnCursoString);

    this.cargando = true;
    this.sesionService.listar(this.areaEnCurso.id).subscribe(
      (res: Sesion[]) => {
        if(res){
          setTimeout(() => {
            this.sesionesHijo = res;
            let numeroMayor = Math.max.apply(Math, this.sesionesHijo.map((num) => num.numero));
            this.sesionFrm.numero = numeroMayor + 1;
            this.cargando = false
          }, 1000);
        }
      },
      err => {
        console.error(err);
        this.cargando = false
      }
    );
  }

  consultarSesion(sesion: Sesion) {
    //Propiedad para comparar con la lista de sesiones y adignar la clase active
    this.cargando2 = true;
    this.sesion = sesion;
    if (Object.keys(this.sesion).length === 0) {
      this.objetoValido = false;
      this.cargando2 = false;      
    } else {
      this.objetoValido = true;
      let id = this.sesion.id;
      setTimeout(() => {
        this.actividadService.listar(id)
          .subscribe((res: Actividad[]) => {
            if(res){
              this.actividades = res;
            } 
          },
          err => {
            console.log(err);
            if(err.status===404){
              console.log('Error');
              this.actividades = [];
              console.log(err.error);
            }
          }
          );
        this.recursoService.listar(id)
          .subscribe((res: Recurso[]) => {
            this.recursos = res;            
          },
          err => {
            console.log(err);
            if(err.status===404){
              this.recursos = [];
              console.log(err.error);
            }
          }
          
          );
          this.cargando2 = false;

      }, 1000);

    }
  }

  editar(obj: Sesion) {
    this.flujoService.enviarObjeto(obj);
    this.flujoService.enviarAccion("Actualizar");

    this.router.navigate(['principal/inicio/aula-en-curso/areas/sesiones/form']);

  }

  eliminar(obj: Sesion) {

    Swal.fire({
      title: `¿Está seguro de eliminar la sesión número ${obj.numero}?`,
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
        this.sesionService.eliminar(obj.id).subscribe(
          res => {
            if (res === "ok") {
              Swal.fire('¡Eliminado!', 'La sesión fue eliminada.', 'success')
              this.consultarSesion({});
            }
          },
          err => { Swal.fire('¡Error!', `Ha ocurrido un error inesperado`, 'error'); console.log(err) },
          () => {
            this.sesionesHijo = this.sesionesHijo.filter(a => a.id !== obj.id);
          }
        );
      }
    })
  }

  //Para destruir la suscripcion anterior al registrar
  ngOnDestroy(): void {
    if (this.accionSuscription$)
      this.accionSuscription$.unsubscribe();
  }

}
