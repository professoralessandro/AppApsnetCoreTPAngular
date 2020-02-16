import { Component, OnInit } from '@angular/core';
import { BlocoService } from 'src/app/services/bloco.service';
import { SedeService } from 'src/app/services/sede.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Sedes } from 'src/app/models/Sedes';
import { Blocos } from 'src/app/models/Blocos';
import { AuthenticationService } from 'src/app/services/authentication.service';

export class BindTable {
  codigo: number;
  unidade: string;
  descricao: string;
  ativo: boolean;
}

export class Permissions {
  btnCadastrar: boolean;
}

@Component({
  selector: 'app-blocos',
  templateUrl: './blocos.component.html',
  styleUrls: ['./blocos.component.scss']
})
export class BlocosComponent implements OnInit {
  public loading = false;
  private size = 0;
  public sedes: Sedes[] = [];
  public listaBlocos: Blocos[] = [];
  public blocos: Blocos = new Blocos();
  public bindTable: BindTable[] = [];
  permissions: Permissions = new Permissions();
  errorMessage = false;
  mensagem = "";

  constructor(
    private blocoServico: BlocoService,
    private sedeServico: SedeService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.blocos.ativo = true;
    this.blocos.descricao = '';
    this.blocos.sedeId = '';
    this.errorMessage = false;
    this.mensagem = "";

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  private handleError() {
    location.href = '/login';
  }

  buscar() {
    debugger;
    this.loading = true;
    this.errorMessage = false;
    this.mensagem = "";

    this.bindTable = [];
    this.blocoServico.getAll(this.blocos.blocoId,
      this.blocos.sedeId,
      this.blocos.descricao,
      this.blocos.ativo).subscribe(c => {
        this.listaBlocos = c;
        c.forEach(x => {
          const item: BindTable = new BindTable();
          item.codigo = x.blocoId;
          item.descricao = x.descricao;
          item.ativo = x.ativo;

          this.sedeServico.getAll(x.sedeId, null, '').subscribe(
            z => {
              item.unidade = z[0].titulo;
              this.loading = false;
            }
          );
          this.bindTable.push(item);
          this.loading = false;
        });

        if (c.length == 0) {
          this.errorMessage = true;
          this.mensagem = "Não há registros para o critério de busca informado!";
        }
      });
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });
  }

}

