import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { Recurso } from '@models/recurso';
import { environment } from 'src/environments/environment';

// import { TipoaulaService } from '@services/tipo-aula/tipo-aula.service';

@Component({
  selector: 'app-archivo-modal',
  templateUrl: './archivo-modal.component.html',
  styleUrls: ['./archivo-modal.component.css']
})
export class ArchivoModalComponent implements OnInit {

  @Input() accionHijo: string;
  @Input() recursoHijo: Recurso;
  @Output() hide = new EventEmitter();
  url: string;
  constructor(
  ) { }

  ngOnInit() {
    if(this.recursoHijo.tipo_recurso_id===1){
      this.url=`${environment.API_URL}/${this.recursoHijo.contenido}`;
    }else if (this.recursoHijo.tipo_recurso_id===2){
      this.url=this.recursoHijo.contenido;
    }
  }

  onSubmit() {

  }


  ocultarModal() {
    this.hide.emit();
  }

}
