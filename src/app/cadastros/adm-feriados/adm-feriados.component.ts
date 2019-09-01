import { Component, OnInit } from '@angular/core';
import { Sedes } from 'src/app/models/Sedes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FeriadosService } from 'src/app/services/feriados.service';
import { SedeService } from 'src/app/services/sede.service';
import { Feriados } from 'src/app/models/Feriados';


@Component({
  selector: 'app-adm-feriados',
  templateUrl: './adm-feriados.component.html',
  styleUrls: ['./adm-feriados.component.scss']
})
export class AdmFeriadosComponent implements OnInit {

  public listaBloqueios: Feriados[] = [];
  public bloqueioQuiosque: Feriados = new Feriados();
  // tslint:disable-next-line: no-use-before-declare
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public loading = false;
  constructor(
    private authService: AuthenticationService,
    private quiosqueBloqueio: FeriadosService,
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

  retornaSedeById(id: number) {
    return this.sedeServico.getAll(id, null, true).toPromise();
  }

  buscar() {
    this.loading = true;
    this.listaBloqueios = [];
    this.quiosqueBloqueio.getAll(
      this.bloqueioQuiosque.feriadoId,
      this.bloqueioQuiosque.sedeId,
      this.bloqueioQuiosque.data,
      this.bloqueioQuiosque.descricao,
      this.bloqueioQuiosque.ativo
    ).subscribe(c => {
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
