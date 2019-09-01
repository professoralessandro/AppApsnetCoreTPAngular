import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkflowFluxoService } from '@app/services/workflow-fluxo.service';
import { AuthenticationService } from '@app/services/authentication.service';
import { AssociadoService } from '@app/services/associados.service';
import { Associado } from '@app/models/Associado';
import { WorkFlowFluxo } from '@app/models/WorkfFowFluxo';
import { MotivosReprovacao } from '@app/models/MotivosReprovacao';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-reprova-dependente',
  templateUrl: './reprova-dependente.component.html',
  styleUrls: ['./reprova-dependente.component.scss']
})
export class ReprovaDependenteComponent implements OnInit {

  //ATRIBUTOS DA CLASSE
  public workFlowFluxo: WorkFlowFluxo = new WorkFlowFluxo();
  public lstWorkFlowFluxo = [];
  public associado: Associado = new Associado();
  public motivosReprovacao: MotivosReprovacao = new MotivosReprovacao ();

  permissions: Permissions = new Permissions();

  //OUTROS ATRIBUTOS DA CLASSE
  public statusId = '';
  public loading = false;
  public mensagem = '';
  public fluxoId: any;

  //VERIFICADORES
  public error = false;
  public sucess = false;
  public temWorkFlow = false;

  constructor(
    private router: ActivatedRoute,
    private workflowFluxoService: WorkflowFluxoService,
    private associadoServico: AssociadoService,
    private authService: AuthenticationService,
    private routerNavigate: Router
  ) { }//CONSTRUTOR

  ngOnInit() {
    this.statusId = '';
    this.loading = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

    //SERVIÇO AINDA NÃO FINCIONA
    this.router.paramMap.subscribe(c => {
      this.fluxoId = c.get('id');
      console.log("FLUXO ID", c.get('id'));

      this.associadoServico.getAllWithParameter(Number(c.get('id'))).subscribe(x => {
        if (c.get('id') != null)
        {
          this.associado = x[0];
          this.workflowFluxoService.getAll(this.associado.associadoId).subscribe( w => {
            this.workFlowFluxo = w[0];
            console.log("Work :", this.workFlowFluxo)
            this.loading = false;
            });
        }
        else
        {
          this.loading = false;
        }
      });
    });
   
  }

  private handleError() {
    location.href = '/login';
  }

  public gravar()
  {
    this.loading = true;

    this.workFlowFluxo.statusAprovacaoId = Number(this.motivosReprovacao.motivoId);
    this.motivosReprovacao.workFlowFluxoId = this.fluxoId;
    this.motivosReprovacao.descricao = "Reprovado via Annexus";
    
    this.inserirMotivoReprovacao();
    this.inserirNovoFluxo();
    this.atualizaStatusAssociado();
  }

  inserirMotivoReprovacao() {
    console.log("Insere motivo de reprovação");
    this.workflowFluxoService.insertMotivoReprovacao(this.motivosReprovacao).subscribe(c => {
      this.loading = false;
      this.mensagem = "Registro inserido com sucesso";
    });
  }

  inserirNovoFluxo() {
    console.log("Insere novo fluxo");
    this.workflowFluxoService.insert(this.workFlowFluxo).subscribe(c => {
      this.loading = false;
      this.mensagem = "Registro inserido com sucesso";
    });
  }

  atualizaStatusAssociado() {
    this.associado.statusAprovacaoId = this.workFlowFluxo.statusAprovacaoId;
    
    this.associadoServico.edit(this.associado).subscribe(p => {
      this.loading = false;
      this.mensagem = "Registro inserido com sucesso";
    });
  }

}

export class Permissions {
  btnCadastrar: boolean;
}
