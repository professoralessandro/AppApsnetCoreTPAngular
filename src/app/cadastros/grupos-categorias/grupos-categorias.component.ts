import { Component, OnInit } from '@angular/core';
import { LocaisReservaCategorias } from 'src/app/models/LocaisReservaCategorias';
import { Categorias } from 'src/app/models/Categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-grupos-categorias',
  templateUrl: './grupos-categorias.component.html',
  styleUrls: ['./grupos-categorias.component.scss']
})
export class GruposCategoriasComponent implements OnInit {
  public listaFeeds: Categorias[] = [];
  public feed: Categorias = new Categorias();
  permissions: Permissions = new Permissions();
  public loading = false;
  constructor(
    private fedeServico: CategoriasService,
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
    this.fedeServico.getAll(this.feed.categoriaId, this.feed.titulo, this.feed.ativo).subscribe(c => {
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
