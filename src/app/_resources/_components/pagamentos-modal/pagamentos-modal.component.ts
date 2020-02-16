import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';

@Component({
  selector: 'app-pagamentos-modal',
  templateUrl: './pagamentos-modal.component.html',
  styleUrls: ['./pagamentos-modal.component.scss']
})
export class PagamentosModalComponent implements OnInit {
  @Input() titulo: string;
  @Input() mensagem: string;
  @Input() botao: string;

  public boxShopline: false;
  public boxCredito: false;
  
  constructor(
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.boxShopline = false;
    this.boxCredito = false;
  }

  fecharModal() {
      this.bsModalRef.hide();
  }

  OpenShopline = function () {
    this.boxShopline = !this.boxShopline;
  }

  OpenCredito = function () {
    this.boxCredito = !this.boxCredito;
  }

}
