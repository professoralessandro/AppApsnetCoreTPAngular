import { Component, OnInit } from '@angular/core';
import { LocaisAcesso } from 'src/app/models/LocaisAcesso';
import { Sedes } from 'src/app/models/Sedes';
import { LocaisAcessoService } from 'src/app/services/locais-acesso.service';
import { SedeService } from 'src/app/services/sede.service';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-locais-acesso',
  templateUrl: './locais-acesso.component.html',
  styleUrls: ['./locais-acesso.component.scss']
})
export class LocaisAcessoComponent implements OnInit {
  public loading = false;
  public sedes: Sedes[] = [];
  public listaLocais: LocaisAcesso[] = [];
  public locaisAcesso: LocaisAcesso = new LocaisAcesso();
  public sedesModel: Sedes = new Sedes();
  public bindTable: BindTable[] = [];
  permissions: Permissions = new Permissions();

  constructor(
    private locaisServico: LocaisAcessoService,
    private alertService: AlertService,
    private sedeServico: SedeService,
    private authService: AuthenticationService,
    private commonService: CommonService
    ) { }

    required: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.locaisAcesso.ativo = true;
    this.locaisAcesso.descricao = '';
    this.locaisAcesso.sedeId = '';

    this.authService.verificarPermissao('Grupos').then(c => { 
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  private handleError() {
    location.href = '/login';
  }

  buscar()
  {
    this.loading = true;
    this.listaLocais = [];
    this.bindTable = [];
    this.locaisServico.getAll(this.locaisAcesso.localAcessoId,
                              this.locaisAcesso.sedeId, this.locaisAcesso.descricao,
                              this.locaisAcesso.ativo).subscribe(
      c => {

        if(c.length > 0) {
            this.required = false;
        }
        else {
            this.required = true;
        }

        c.forEach(x => {
          const item: BindTable = new BindTable ();
          item.codigo = x.localAcessoId;
          item.descricao = x.descricao;
          this.loading = false;

          this.sedeServico.getAll(x.sedeId, null, '').subscribe(
              z => {
                item.sede = z[0].titulo;
              }
            );
          this.bindTable.push(item);
        });
      },
      error => {
        this.alertService.error(['Ocorreu um erro ao chamar o serviço']);
      });
  }

  Mascara(){
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });
  }
}



export class BindTable {
  codigo: number;
  sede: string;
  descricao: string;
}

export class Permissions {
  btnCadastrar: boolean;
}