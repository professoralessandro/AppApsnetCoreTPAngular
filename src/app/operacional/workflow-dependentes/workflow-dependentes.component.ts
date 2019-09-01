import { Component, OnInit } from '@angular/core';
import { WorkflowFluxoService } from 'src/app/services/workflow-fluxo.service';
import { WorkFlowFluxo } from 'src/app/models/WorkfFowFluxo';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';

import { AuthenticationService } from 'src/app/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

//IMPORTAR DADOS DO USUARIO
import { AssociadoService } from 'src/app/services/associados.service';
import { Associado } from 'src/app/models/Associado';

//IMPORTAR DADOS DO USUARIO
import { SpRetornadependentesAprovacaoreprovacaoService } from 'src/app/services/spretornadependentesaprovacaoreprovacao.service';
import { spRetornaDependentesAprovacaoReprovacao } from 'src/app/models/spRetornaDependentesAprovacaoReprovacao';
import { IfStmt } from '@angular/compiler';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-workflow-dependentes',
  templateUrl: './workflow-dependentes.component.html',
  styleUrls: ['./workflow-dependentes.component.scss']
})
export class WorkflowDependentesComponent implements OnInit {
  //ATRIBUTOS DA CLASSE
  public loading = false;

  //VERIFICADORES
  public error = false;
  public sucess = false;
  //public isNew = false;

  //OBJETOS DA CLASSE
  public workflowFluxo: WorkFlowFluxo = new WorkFlowFluxo();
  public associado: Associado = new Associado();
  public associadoAux: Associado = new Associado();
  public SpRetornaDependentesAprovacaoReprovacao = new spRetornaDependentesAprovacaoReprovacao();

  permissions: Permissions = new Permissions();

  //LISTS DA CLASSE
  public listaWorkflowFluxo: WorkFlowFluxo[] = [];
  public listaAssociados: Associado[] = [];
  public lstSpRetornaDependentesAprovacaoReprovacao: spRetornaDependentesAprovacaoReprovacao[] = [];
  public list: [];

  public associadosPai: any[];

  //OUTRAA VARIAVEIS
  public mensagem: string;
  public associadoPaiId: any;
  constructor(
    private workFlowFluxoServico: WorkflowFluxoService,
    private associadoServico: AssociadoService,
    private spRetornadependentesAprovacaoreprovacaServico: SpRetornadependentesAprovacaoreprovacaoService,
    private authService: AuthenticationService,
    private alertService: AlertService,
    private router: Router,
    private commonService: CommonService
  ) { }//CONSTRUTOR

  private handleError() {
    location.href = '/login';
  }

  retornaTitularById(id: number) {
    return this.associadoServico.getAllWithParameter(id, null, null, null, true).toPromise();

  }

  ngOnInit() {
    this.mensagem = '';
    this.loading = true;
    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

    this.lstSpRetornaDependentesAprovacaoReprovacao = [];
    this.spRetornadependentesAprovacaoreprovacaServico.getAll()
      .toPromise()
      .then(y => {
        y.forEach(l => {
          this.associadoServico.getAllWithParameter(Number(l.registroId))
            .toPromise()
            .then(a => {
              this.SpRetornaDependentesAprovacaoReprovacao = new spRetornaDependentesAprovacaoReprovacao();

              this.SpRetornaDependentesAprovacaoReprovacao.nome = a[0].nome;
              this.SpRetornaDependentesAprovacaoReprovacao.tipo = 'Dependente';
              this.SpRetornaDependentesAprovacaoReprovacao.alcada = 'Fluxo Dependente';
              this.SpRetornaDependentesAprovacaoReprovacao.dataNascimento = a[0].dataNascimento;
              this.SpRetornaDependentesAprovacaoReprovacao.dataFluxo = l.dataFluxo;
              this.SpRetornaDependentesAprovacaoReprovacao.workFlowFluxoId = l.workFlowFluxoId;
              this.SpRetornaDependentesAprovacaoReprovacao.workFlowId = l.workFlowId;
              this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = a[0].tipoDependente;
              this.SpRetornaDependentesAprovacaoReprovacao.associadoIdPai = a[0].associadoIdPai;

              if (a[0].tipoDependente == "C") {
                this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = "Filho(a)";
              }

              if (a[0].tipoDependente == "SP") {
                this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = "Cônjude(Esposo/Esposa)";
              }

              this.buscarAssociadoPai(this.SpRetornaDependentesAprovacaoReprovacao.associadoIdPai);

              console.log("ID PAI", this.SpRetornaDependentesAprovacaoReprovacao.associadoIdPai);
              console.log("LISTA", this.lstSpRetornaDependentesAprovacaoReprovacao);

              this.lstSpRetornaDependentesAprovacaoReprovacao.push(this.SpRetornaDependentesAprovacaoReprovacao);

            })
        });
      });
  }//ON INIT

  buscarAssociadoPai(associadoIdPai: number) {
    let i = this.lstSpRetornaDependentesAprovacaoReprovacao.length;
    this.associadoServico.getAllWithParameter(associadoIdPai).toPromise()
      .then(k => {
        this.lstSpRetornaDependentesAprovacaoReprovacao.forEach(h => {
          if (h.associadoIdPai == k[0].associadoId) {
            h.titular = k[0].nome;
            h.associadoIdPai = k[0].associadoId
          }
        });
      });

    if (i == i.toLocaleString.length) {
      this.loading = false;
    }
  }

  buscar() {

    let i = 0;

    this.loading = true;
    this.sucess = false;
    this.error = false;
    this.mensagem = '';

    this.lstSpRetornaDependentesAprovacaoReprovacao = [];

    this.spRetornadependentesAprovacaoreprovacaServico.getAll()
      .toPromise()
      .then(y => {
        y.forEach(l => {
          this.associadoServico.getAllWithParameter(Number(l.registroId))
            .toPromise()
            .then(a => {
              debugger;
              if (a[0].nome === this.associado.nome) {

                this.SpRetornaDependentesAprovacaoReprovacao = new spRetornaDependentesAprovacaoReprovacao();

                this.SpRetornaDependentesAprovacaoReprovacao.nome = a[0].nome;
                this.SpRetornaDependentesAprovacaoReprovacao.tipo = 'Dependente';
                this.SpRetornaDependentesAprovacaoReprovacao.alcada = 'Fluxo Dependente';
                this.SpRetornaDependentesAprovacaoReprovacao.dataNascimento = a[0].dataNascimento;
                this.SpRetornaDependentesAprovacaoReprovacao.dataFluxo = l.dataFluxo;
                this.SpRetornaDependentesAprovacaoReprovacao.workFlowFluxoId = l.workFlowFluxoId;
                this.SpRetornaDependentesAprovacaoReprovacao.workFlowId = l.workFlowId;
                this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = a[0].tipoDependente;
                this.SpRetornaDependentesAprovacaoReprovacao.associadoIdPai = a[0].associadoIdPai;

                if (a[0].tipoDependente == "C") {
                  this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = "Filho(a)";
                }

                if (a[0].tipoDependente == "SP") {
                  this.SpRetornaDependentesAprovacaoReprovacao.grauParentesco = "Cônjude(Esposo/Esposa)";
                }

                this.buscarAssociadoPai(this.SpRetornaDependentesAprovacaoReprovacao.associadoIdPai);

                this.lstSpRetornaDependentesAprovacaoReprovacao.push(this.SpRetornaDependentesAprovacaoReprovacao);

                this.loading = false;
              }
            })
        });
      });

  }

}//CLASS


export class Permissions {
  btnCadastrar: boolean;
}
