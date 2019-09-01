import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { PagamentosModalComponent } from '@app/_resources/_components/pagamentos-modal/pagamentos-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor( private modalService: BsModalService ) { }

  modalPagamentos(titulo: string, mensagem: string){
    const bsModalRef: BsModalRef = this.modalService.show(PagamentosModalComponent);
    bsModalRef.content.titulo = titulo;
    bsModalRef.content.mensagem = mensagem;
  }
}
