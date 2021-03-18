import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AulaEnCursoAreaService } from '@services/aula-en-curso-area/aula-en-curso-area.service';
import { AulaEnCursoArea } from '@models/AulaEnCursoArea';
import { Sesion } from '@models/Sesion';
import { UsuarioResponse } from '@models/Usuario';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FlujoService } from '@services/flujo.service';

@Component({
  selector: 'app-area-en-curso-modal',
  templateUrl: './area-en-curso-modal.component.html',
  styleUrls: ['./area-en-curso-modal.component.css']
})
export class AreaEnCursoModalComponent implements OnInit, OnDestroy {

  area: AulaEnCursoArea;
  areaEnCursoForm: FormGroup;
  private validarLink = /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/;

  constructor(private aulaEnCursoAreaService: AulaEnCursoAreaService,
    private _builder: FormBuilder,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private router: Router,
    private flujoService: FlujoService
  ) { }

  ngOnInit(): void {
    this.validar();
  }

  validar() {
    // this.sesionHijo.numero=parseInt(localStorage.getItem('nuevoNumero'));
    this.areaEnCursoForm = this._builder.group({
      id: this.area.id,
      link: [this.area.link, [Validators.pattern(this.validarLink)]]
    });

  }

  actualizarLink() {
    this.area = this.areaEnCursoForm.value;
    let areaEnCurso: AulaEnCursoArea;
    areaEnCurso = { link: this.area.link }
    this.aulaEnCursoAreaService.actualizarLink(this.area.id, areaEnCurso)
    .subscribe(
      res => {
      if (res === "ok") {
        this.toastr.success("Link guardado correctamente");
        let id: string= localStorage.getItem('ai');
        this.aulaEnCursoAreaService.listar(id).subscribe(
          (res: AulaEnCursoArea[]) => {
            localStorage.setItem('areas', JSON.stringify(res));
            this.flujoService.refrescar(null);
          }
        );
      }
    },
      err => {
        this.toastr.error('Ha ocurrido un error inesperado');
        console.error(err);
      }
    );
  }

  mensajeError(campo: string): string {
    let mensaje: string;
    if (this.areaEnCursoForm.get(campo).errors.required) {
      mensaje = `El link es requerido`;
    } else if (this.areaEnCursoForm.get(campo).hasError('pattern')) {
      mensaje = `Ingrese un link válido`;
    }
    return mensaje;
  }

  campoValido(campo: string): boolean {
    return (
      (this.areaEnCursoForm.get(campo).touched || this.areaEnCursoForm.get(campo).dirty) &&
      !this.areaEnCursoForm.get(campo).valid
    )
  }

  ngOnDestroy(): void {
    // this.dtTrigger.unsubscribe();
  }

}
