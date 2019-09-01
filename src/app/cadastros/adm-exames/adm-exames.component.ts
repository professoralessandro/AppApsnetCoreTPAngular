import { Component, OnInit } from '@angular/core';
import { Exames } from 'src/app/models/Exames';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ExamesService } from 'src/app/services/exames.service';

@Component({
  selector: 'app-adm-exames',
  templateUrl: './adm-exames.component.html',
  styleUrls: ['./adm-exames.component.scss']
})
export class AdmExamesComponent implements OnInit {
  public loading = false;
  public lstExames: Exames[] = [];
  public exame: Exames = new Exames();
  // tslint:disable-next-line: no-use-before-declare
  permissions: Permissions = new Permissions();

  constructor(
    private authService: AuthenticationService,
    // private quiosqueBloqueio: ,
    private exameService: ExamesService
  ) { }

  required = false;

  ngOnInit() {
    this.exame.ativo = true;
    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);
  }

  buscar() {
    this.loading = true;
    this.lstExames = [];
    this.exameService.getAll(this.exame.exameId, this.exame.descricao, null, null, this.exame.ativo, null).subscribe(c => {
      this.lstExames = c;
      this.loading = false;
      if (c.length > 0) {
        this.required = false;
      } else {
        this.required = true;
      }
    });

  }

  private handleError() {
    location.href = '/login';
  }
}

export class Permissions {
  btnCadastrar: boolean;
}
