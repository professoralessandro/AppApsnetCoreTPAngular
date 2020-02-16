import { Component, OnInit } from '@angular/core';
import { LocaisReserva } from 'src/app/models/LocaisReserva';
import { LocaisReservaService } from 'src/app/services/locais-reserva.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-locais-reserva',
  templateUrl: './locais-reserva.component.html',
  styleUrls: ['./locais-reserva.component.scss']
})
export class LocaisReservaComponent implements OnInit {
  public loading = false;
  public listaLocais: LocaisReserva[] = [];
  public locaisReserva: LocaisReserva = new LocaisReserva();
  permissions: Permissions = new Permissions();

  constructor(
    private locaisReservaServico: LocaisReservaService,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) { }

  required: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.locaisReserva.ativo = true;
    this.locaisReserva.descricao = '';

    this.authService.verificarPermissao('Grupos').then(c => { this.permissions.btnCadastrar = c; this.loading = false; }).catch(this.handleError);
  }

  private handleError() {
    location.href = '/login';
  }

  Mascara() {
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'))
  }

  buscar() {
    this.loading = true;
    this.listaLocais = [];
    this.locaisReservaServico.getAll(this.locaisReserva.localReservaId,
      this.locaisReserva.descricao,
      this.locaisReserva.ativo).subscribe(c => {
        this.listaLocais = c;
        this.loading = false;
        if (c.length > 0) {
          this.required = false;
        }
        else {
          this.required = true;
        }
      });
  }
}

export class Permissions {
  btnCadastrar: boolean;
}