import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/Feed';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-destaques',
  templateUrl: './destaques.component.html',
  styleUrls: ['./destaques.component.scss']
})
export class DestaquesComponent implements OnInit {
  public loading = false;
  public listaFeeds: Feed[] = [];
  public feed: Feed = new Feed();
  permissions: Permissions = new Permissions();

  constructor(
    private fedeServico: FeedService,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) { }

  required = false;

  ngOnInit() {
    this.loading = true;
    this.feed.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);
  }

  private handleError() {
    location.href = '/login';
  }

  buscar()
  {
    this.loading = true;
    this.listaFeeds = [];
    this.fedeServico.getAll(null, this.feed.titulo, this.feed.ativo).subscribe(c => {
      this.listaFeeds = c;

      this.loading = false;

      if (c.length > 0) {
        this.required = false;
      } else {
          this.required = true;
      }
    });
  }

  private isLoanding()
  {
    this.loading = true;
  }
}

export class Permissions {
  btnCadastrar: boolean;
}
