import { Component, OnInit } from '@angular/core';
import { FimdeSemana } from 'src/app/models/FinsDeSemana';
import { Sedes } from 'src/app/models/Sedes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FimDeSemanaService } from 'src/app/services/fim-de-semana.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-fins-de-semana',
  templateUrl: './fins-de-semana.component.html',
  styleUrls: ['./fins-de-semana.component.scss']
})
export class FinsDeSemanaComponent implements OnInit {

  public listaBloqueios: FimdeSemana[] = [];
  public bloqueioQuiosque: FimdeSemana = new FimdeSemana();
  // tslint:disable-next-line: no-use-before-declare
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public loading = false;
  public dataInicio: any;

  constructor(
    private authService: AuthenticationService,
    private quiosqueBloqueio: FimDeSemanaService,
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
  retornaSedeById(id: number) {
    return this.sedeServico.getAll(id, null, true).toPromise();
  }
  buscar() {
    this.loading = true;
    this.listaBloqueios = [];
    this.quiosqueBloqueio.getAll(this.bloqueioQuiosque.fimSemanaId, this.bloqueioQuiosque.descricao, this.bloqueioQuiosque.sedeId,
      this.bloqueioQuiosque.data, this.bloqueioQuiosque.ativo).subscribe(c => {
        this.listaBloqueios = c;
        this.loading = false;
        this.listaBloqueios.map(x => this.retornaSedeById(x.sedeId).then(z => {
          x.nomeSede = z[0].titulo;
        }));
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
