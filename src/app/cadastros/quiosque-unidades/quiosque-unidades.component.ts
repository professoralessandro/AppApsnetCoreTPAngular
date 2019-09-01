import { Component, OnInit } from '@angular/core';
import { Quiosques } from 'src/app/models/Quiosques';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuiosqueUnidadeService } from 'src/app/services/quiosque-unidade.service';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';

@Component({
  selector: 'app-quiosque-unidades',
  templateUrl: './quiosque-unidades.component.html',
  styleUrls: ['./quiosque-unidades.component.scss']
})
export class QuiosqueUnidadesComponent implements OnInit {
  public unidadeQuiosque: Quiosques = new Quiosques();
  public listaQuiosques: Quiosques[] = [];
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public loading = false;
  constructor(
    private authService: AuthenticationService,
    private quiosqueUnidades: QuiosqueUnidadeService,
    private sedeServico: SedeService
  ) { }

  required = false;

  ngOnInit() {
    this.loading = true;
    this.unidadeQuiosque.sedeId = 0;
    this.unidadeQuiosque.ativo = true;
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
    this.listaQuiosques = [];

    this.quiosqueUnidades.getAll(
      this.unidadeQuiosque.quiosqueId,
      this.unidadeQuiosque.sedeId,
      this.unidadeQuiosque.numeroQuiosque,
      this.unidadeQuiosque.ativo).subscribe(c => {
        this.listaQuiosques = c;
        this.loading = false;
        this.listaQuiosques.map(x => this.retornaSedeById(x.sedeId).then(z => {
          x.nomeSede = z[0].titulo;
        }));


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