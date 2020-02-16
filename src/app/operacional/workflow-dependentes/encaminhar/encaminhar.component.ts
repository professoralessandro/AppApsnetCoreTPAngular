import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

//IMPORTAR ALCADAS
import { AlcadaService } from 'src/app/services/alcada.service';
import { Alcadas } from 'src/app/models/Alcada';

//IMPORTAR USUARIO
import { AssociadoService } from 'src/app/services/associados.service';
import { Associado } from 'src/app/models/Associado';

//IMPORTAR WORKFLOW
import { WorkflowFluxoService } from 'src/app/services/workflow-fluxo.service';
import { WorkFlowFluxo } from 'src/app/models/WorkfFowFluxo';
import { DebugHelper } from 'protractor/built/debugger';

@Component({
  selector: 'app-encaminhar',
  templateUrl: './encaminhar.component.html',
  styleUrls: ['./encaminhar.component.scss']
})
export class EncaminharComponent implements OnInit {
  public mensagem : string;

  public workFlowId1 : string;

  //ATRIBUTOS DA CLASSE
  public loading = false;

  //VERIFICADORES
  public error = false;
  public sucess = false;
  desabilitaBotao = true;

  public workFlowFluxo: WorkFlowFluxo = new WorkFlowFluxo();
  public associado: Associado = new Associado();
  public alcada: Alcadas = new Alcadas();
  public lstAlcadas = [];

  //OUTROS ATRIBUTOR

  constructor(
    private router: ActivatedRoute,
    private workflowFluxoService: WorkflowFluxoService,
    private associadoServico: AssociadoService,
    private alcadaService: AlcadaService,
    private authService: AuthenticationService,
    private routerNavigate: Router
  ) { }

  ngOnInit() {
    this.workFlowId1 = '';
    this.mensagem = '';

    //SERVIÇO AINDA NÃO FINCIONA
    this.loading = true;
    this.router.paramMap.subscribe(c => {
      this.associadoServico.getAllWithParameter(Number(c.get('id'))).subscribe(x => {
        if (c.get('id') != null)
        {
          this.mensagem = x[0].nome;
          this.associado = x[0];
          
          this.workflowFluxoService.getAll(this.associado.associadoId).subscribe( w => {

            this.workFlowFluxo = w[0];
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

  encaminhar()
  {
    this.loading = true;
    this.workFlowFluxo.alcadaId = Number(this.workFlowId1);
    this.workflowFluxoService.edit(this.workFlowFluxo).subscribe( n=>{
      this.routerNavigate.navigate(['operacional/workflow-dependentes']).then((e) => {
        this.loading = false;
      });
    });

  }

}//CLASS
