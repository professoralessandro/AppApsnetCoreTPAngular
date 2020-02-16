import { Component, OnInit } from '@angular/core';
import { TipoItens } from 'src/app/models/TipoItens';
import { TipoItensService } from 'src/app/services/tipo-itens.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-tipo-itens',
  templateUrl: './tipo-itens.component.html',
  styleUrls: ['./tipo-itens.component.scss']
})
export class TipoItensComponent implements OnInit {
  public listaFeeds: TipoItens[] = [];
  public feed: TipoItens = new TipoItens();
  permissions: Permissions = new Permissions();
  public loading = false;
  constructor(
    private fedeServico: TipoItensService,
    private authService: AuthenticationService
  ) { }

  required = false;

  ngOnInit() {
    this.feed.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);
  }

  private handleError() {
    location.href = '/login';
  }

  buscar() {
    this.loading = true;
    this.listaFeeds = [];
    this.fedeServico.getAll(this.feed.tipoItemId, this.feed.descricao, this.feed.ativo, this.feed.chave).subscribe(c => {
      this.listaFeeds = c;
      this.loading = false;

      if (c.length > 0) {
        this.required = false;
      } else {
        this.required = true;
      }
    });
  }
}

export class Permissions {
  btnCadastrar: boolean;
}

