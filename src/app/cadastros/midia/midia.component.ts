import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { RepositorioMidias } from 'src/app/models/RepositorioMidias';
import { RepositorioMidiasService } from 'src/app/services/repositorio-midias.service';

@Component({
  selector: 'app-midia',
  templateUrl: './midia.component.html',
  styleUrls: ['./midia.component.scss']
})
export class MidiaComponent implements OnInit {
  public loading = false;
  public listaFeeds: RepositorioMidias[] = [];
  public repositorioMidias: RepositorioMidias = new RepositorioMidias();
  permissions: Permissions = new Permissions();

  constructor(
    private midiaService: RepositorioMidiasService,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) { }

  required = false;

  ngOnInit() {
    this.loading = true;
    this.repositorioMidias.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.loading = false;
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);
  }

  private handleError() {
    location.href = '/login';
  }

  buscar() {
    this.loading = true;
    this.listaFeeds = [];
    this.midiaService.getAll(this.repositorioMidias.repositorioMidiaId,
      this.repositorioMidias.descricao, this.repositorioMidias.ativo).subscribe(c => {
        this.loading = false;
        this.listaFeeds = c;

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
