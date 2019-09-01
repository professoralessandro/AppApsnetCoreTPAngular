import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ConfiguracaoReservaQuiosques } from '../../models/ConfiguracaoReservaQuiosques'
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { QuiosqueConfigService } from 'src/app/services/quiosque-config.service';

@Component({
  selector: 'app-quiosque-config',
  templateUrl: './quiosque-config.component.html',
  styleUrls: ['./quiosque-config.component.scss']
})
export class QuiosqueConfigComponent implements OnInit {

  public listaBloqueios: ConfiguracaoReservaQuiosques[] = [];
  public bloqueioQuiosque: ConfiguracaoReservaQuiosques = new ConfiguracaoReservaQuiosques();
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public loading = false;
  constructor(
    private authService: AuthenticationService,
    private quiosqueBloqueio: QuiosqueConfigService,
    private sedeServico: SedeService
  ) { }

  required = false;

  ngOnInit() {
    this.loading = true;
    this.bloqueioQuiosque.ativo = true;
    this.bloqueioQuiosque.sedeId = 0;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  buscar() {
    this.loading = true;
    this.listaBloqueios = [];

    this.quiosqueBloqueio.getAll(
      this.bloqueioQuiosque.configuracaoReservaQuiosqueId,
      this.bloqueioQuiosque.descricao,
      this.bloqueioQuiosque.sedeId,
      this.bloqueioQuiosque.ativo).subscribe(c => {
        this.listaBloqueios = c;
        this.loading = false;

        if (c.length > 0) {
          this.required = false;
        } else {
          this.required = true;
          this.loading = false;
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
    this.loading = false;
  }

}

export class Permissions {
  btnCadastrar: boolean;
}