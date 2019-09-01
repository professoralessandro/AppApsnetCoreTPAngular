import { Component, OnInit } from '@angular/core';
import { FormasPagamentoService } from 'src/app/services/formas-pagamento.service';
import { FormasPagamento } from 'src/app/models/FormasPagamento';
import { Sedes } from 'src/app/models/Sedes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-adm-formas-pagamento',
  templateUrl: './adm-formas-pagamento.component.html',
  styleUrls: ['./adm-formas-pagamento.component.scss']
})
export class AdmFormasPagamentoComponent implements OnInit {
  public listaBloqueios: FormasPagamento[] = [];
  public bloqueioQuiosque: FormasPagamento = new FormasPagamento();
  // tslint:disable-next-line: no-use-before-declare
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public loading = false;
  constructor(
    private authService: AuthenticationService,
    private quiosqueBloqueio: FormasPagamentoService,
    private sedeServico: SedeService
  ) { }

  required = false;

  ngOnInit() {
    this.loading = true;
    this.bloqueioQuiosque.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  buscar() {
    this.loading = true;
    this.listaBloqueios = [];
    this.quiosqueBloqueio.getAll(this.bloqueioQuiosque.formaPagamentoId,
      this.bloqueioQuiosque.descricao,
      this.bloqueioQuiosque.ativo).subscribe(c => {
      this.listaBloqueios = c;
      this.loading = false;
      if (c.length > 0) {
        this.required = false;
      } else {
        this.required = true;
      }
    });
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });

  }

  private handleError() {
    location.href = '/login';
  }

}

export class Permissions {
  btnCadastrar: boolean;
}
