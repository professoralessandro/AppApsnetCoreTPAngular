import { Component, OnInit } from '@angular/core';
import { ItensLocacaoTabelas } from 'src/app/models/ItensLocacaoTabelas';
import { ItensLocacaoService } from 'src/app/services/itens-locacao.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';
import { TipoItensService } from 'src/app/services/tipo-itens.service';
import { TipoItens } from 'src/app/models/TipoItens';

@Component({
  selector: 'app-itens-locacao',
  templateUrl: './itens-locacao.component.html',
  styleUrls: ['./itens-locacao.component.scss']
})
export class ItensLocacaoComponent implements OnInit {
  public listaFeeds: ItensLocacaoTabelas[] = [];
  public feed: ItensLocacaoTabelas = new ItensLocacaoTabelas();
  permissions: Permissions = new Permissions();
  public tipoItens: TipoItens[] = [];
  public sedes: Sedes[] = [];
  public loading = false;
  public paginaAtual = 1;
  
  constructor(
    private fedeServico: ItensLocacaoService,
    private authService: AuthenticationService,
    private sedeServico: SedeService,
    private tipoItensServico: TipoItensService,
  ) { }

  required = false;

  ngOnInit() {
    this.feed.sedeId = 0;
    this.loading = true;
    this.feed.ativo = true;
    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
    this.carregaTipoItens();
  }

  private handleError() {
    location.href = '/login';
  }

  carregaTipoItens() {
    this.tipoItensServico.getAll(null, null, true, null).subscribe(c => {
      this.tipoItens = c;
    });
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });
  }

  retornaSedeById(id: number) {
    return this.sedeServico.getAll(id, null, true).toPromise();

  }
  retornaItensLocacaoTabelasById(id: number) {
    return this.tipoItensServico.getAll(id, null, true).toPromise();
  }

  buscar() {
    this.loading = true;
    this.listaFeeds = [];
    this.fedeServico.getAll(this.feed.itensLocacaoTabelaId, this.feed.descricao,
      this.feed.sedeId, this.feed.tipoItemId, this.feed.ativo).subscribe(c => {
        this.listaFeeds = c;
        this.loading = false;

        this.listaFeeds.map(x => this.retornaSedeById(x.sedeId).then(z => {
          x.nomeSede = z[0].titulo;
        }));
        this.listaFeeds.map(x => this.retornaItensLocacaoTabelasById(x.tipoItemId).then(z => {
          x.nomeItensLocacaoTabelas = z[0].descricao;
        }));

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
