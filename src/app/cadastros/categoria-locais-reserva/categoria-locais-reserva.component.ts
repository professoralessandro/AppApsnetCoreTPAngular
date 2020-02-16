import { Component, OnInit } from '@angular/core';
import { CategoriaLocaisReservaService } from 'src/app/services/categoria-locais-reserva.service';
import { LocaisReservaCategorias } from 'src/app/models/LocaisReservaCategorias';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-categoria-locais-reserva',
  templateUrl: './categoria-locais-reserva.component.html',
  styleUrls: ['./categoria-locais-reserva.component.scss']
})
export class CategoriaLocaisReservaComponent implements OnInit {
  public loading = false;
  public listaCategorias: LocaisReservaCategorias[] = [];
  public categorias: LocaisReservaCategorias = new LocaisReservaCategorias();
  permissions: Permissions = new Permissions();

  constructor(
    private categoriaServico: CategoriaLocaisReservaService,
    private authService: AuthenticationService,
    private commonService: CommonService

  ) { }

  ngOnInit()
  {
    this.loading = true;
    this.categorias.localReservaCategoriaId = '';
    this.categorias.titulo = '';
    this.categorias.ativo = true;

    this.authService.verificarPermissao('Grupos')
      .then(c => {  this.loading = false; this.permissions.btnCadastrar = c; })
      .catch(this.handleError);
  }

  private handleError() {
    location.href = '/login';
  }

  Mascara() {
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  required: boolean = false;
  buscar() {
    this.loading = true;
    this.listaCategorias = [];
    this.categoriaServico.getAll(
      this.categorias.localReservaCategoriaId,
      this.categorias.titulo,
      this.categorias.ativo).subscribe(c => {
        this.listaCategorias = c;
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
