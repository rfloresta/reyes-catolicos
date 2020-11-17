import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnioEscolar } from '@models/AnioEscolar';
import { AulaEnCurso } from '@models/AulaEnCurso';
import { UsuarioResponse } from '@models/Usuario';
import { ActividadService } from '@services/actividad/actividad.service';
import { AulaEnCursoService } from '@services/aula-en-curso/aula-en-curso.service';
import { FlujoService } from 'src/app/services/flujo.service';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  url: string = `${environment.API_URL}/`;
  cargando: boolean;
  cargando2: boolean;
  cargaEstudiantes: boolean;
  cargaProfesores: boolean;
  cargaArchivos: boolean;
  anioEscolar: AnioEscolar;
  aulasEnCursoHijo: AulaEnCurso[];
  cantidadEstudiantes: number;
  cantidadProfesores: number;
  cantidadArchivos: number;
  cantidadAulas: number;

  constructor(private flujoService: FlujoService,
    private aulaEnCursoService: AulaEnCursoService,
    private router: Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.cargando = true;
    let anioActivoString = localStorage.getItem('anio_activo');
    let anio = JSON.parse(anioActivoString)
    this.anioEscolar = anio;
    
    this.listarAulasEnCurso();
    this.obtenerCantidadArchivos();
    this.obtenerCantidadEstudiantes();
    this.obtenerCantidadProfesores();

    this.cargando2 = true;

    setTimeout(() => {
      this.cargando2 = false
    }, 1000);

    // $.getScript('../assets/js/init/initMenu.js');
  }

  obtenerCantidadEstudiantes() {
    this.cargaEstudiantes = true;
    setTimeout(() => {
      this.aulaEnCursoService.obtenerCantidadUsuarioEnCurso(this.anioEscolar.id, 4).subscribe((res: number) => {
        console.log('estu->', res);

        this.cantidadEstudiantes = res;
      });
      this.cargaEstudiantes = false;
    }, 1000);
  }

  obtenerCantidadProfesores() {
    this.cargaProfesores = true;
    setTimeout(() => {
      this.aulaEnCursoService.obtenerCantidadUsuarioEnCurso(this.anioEscolar.id, 3).subscribe((res: number) => {
        console.log('pro->', res);

        this.cantidadProfesores = res;
        this.cargaProfesores = false;

      });
    }, 1000);
  }
  obtenerCantidadArchivos() {
    this.cargaArchivos = true;
    setTimeout(() => {
      this.aulaEnCursoService.obtenerCantidadArchivos().subscribe((res: number) => {
        console.log('archivos->', res);
        
        this.cantidadArchivos = res;
        this.cargaArchivos = false;

      });
    }, 1000);
  }

  listarAulasEnCurso(){
    this.cargando=true;
    this.aulaEnCursoService.listar(this.anioEscolar.id).subscribe(
      (res: AulaEnCurso[]) => {
        setTimeout(() => {
          this.aulasEnCursoHijo = res;
          this.cantidadAulas = res.length;
          this.cargando = false;
        }, 1000);
      },
      err => console.error(err)
    );
  }

  irAula(aulaEnCurso: AulaEnCurso){
    localStorage.setItem('ai', aulaEnCurso.id.toString());
    this.router.navigate(['/principal/dashboard/aulas-en-curso/aula-en-curso/areas']);
  }

}
