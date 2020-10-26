import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsuarioResponse } from '@models/Usuario';
import { Observable, Subscription } from 'rxjs';
import { FlujoService } from 'src/app/services/flujo.service';
import { SesionService } from '@services/sesion/sesion.service';
import { Sesion } from '@models/sesion';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import Swal from 'sweetalert2';
// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-sesion-list-nav',
  templateUrl: './sesion-list-nav.component.html',
  styleUrls: ['./sesion-list-nav.component.css']
})
export class SesionListNavComponent implements OnInit, OnDestroy {

  accion: string;
  accionSuscription$: Subscription;
  cargando: boolean;
  area_aula_anio_id: string;
  path: string;
  path2: string;
  urlAnterior: string;
  p: number = 1;
  sesionesHijo: Sesion[] = [];
  sesion: Sesion = {};
  sesionFrm: Sesion = {
    id: null,
    numero: null,
    fecha: null,
    link: null,
    tema: null,
    area_aula_anio_id: null
  };

  area: AulaEnCursoArea = {};
  usuario: UsuarioResponse;
  tipo: number;
  time: string;
  time_end: string;
  constructor(private flujoService: FlujoService,
    private sesionService: SesionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void { 
    let areaString = localStorage.getItem('area');
    this.area = JSON.parse(areaString);

    this.cargando = true;
    this.sesionService.listar(this.area.id).subscribe(
      (res: Sesion[]) => {
        this.sesionesHijo = res;
        let numeroMayor = Math.max.apply(Math, this.sesionesHijo.map((num) => num.numero));
        // this.sesionFrm.numero=numeroMayor+1;
        localStorage.setItem('nuevoNumero', numeroMayor + 1); 
      },
      err => console.error(err)
    );

    this.sesionService.obtenerSesionActual(this.area.id)
      .subscribe((res: Sesion) => {
        this.consultarSesion(res);
      });

    this.flujoService.enviarObjeto(this.sesionFrm);
    this.flujoService.enviarAccion("Registrar");
    


    // this.flujoService.$itemValue.subscribe((val)=>{
    //   this.sesionHijo = JSON.parse(val);
    //   console.log('sesionHijo ->', this.sesionHijo);
    // });



    // this.accionSuscription$=this.flujoService.enviarAccion$.subscribe((accion) => this.accion=accion);


    // let usuarioString = localStorage.getItem('usuario');
    // this.usuario = JSON.parse(usuarioString);
    // this.tipo = this.usuario.tipo;



    // if(this.tipo===1 || this.tipo===2 ){
    // this.path = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones/";
    //   // this.path2 = "/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones";
    // }else{
    //   this.path = "/principal/inicio/areas-curriculares";
    //   this.path2 = "/principal/inicio/areas-curriculares/estudiantes";
    // }


  }

  consultarSesion(sesion: Sesion) {
    //Propiedad para comparar con la lista de sesiones y adignar la clase active
    this.sesion = sesion;
    localStorage.setItem('sesion', JSON.stringify(sesion));
    this.router.navigate(['/principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones', sesion.numero]);
  }

  editar(obj: Sesion) {
    console.log('SESION -',obj);

    this.flujoService.enviarObjeto(obj);
    this.flujoService.enviarAccion("Actualizar");
    this.router.navigate(['principal/dashboard/gestion-aulas/aulas-en-curso/aula-en-curso/areas/sesiones/frm/guardar']);
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
            if (res === "ok") Swal.fire('¡Eliminado!', 'La sesión fue eliminado.', 'success')
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
