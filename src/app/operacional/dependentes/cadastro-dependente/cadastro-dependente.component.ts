import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { AssociadoService } from 'src/app/services/associados.service';
import { HelperService } from '@app/services/helper.service'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Associado } from '@app/models/Associado';
import { WorkflowFluxoService } from '@app/services/workflow-fluxo.service';
import { WorkFlowFluxo } from '@app/models/WorkfFowFluxo';
import { WorkflowService } from '@app/services/workflow.service';


@Component({
  selector: 'app-cadastro-dependente',
  templateUrl: './cadastro-dependente.component.html',
  styleUrls: ['./cadastro-dependente.component.scss']
})
export class CadastroDependenteComponent implements OnInit {
  public editMode = false;
  public associado: Associado = new Associado();
  public workFlowFluxo: WorkFlowFluxo = new WorkFlowFluxo();
  public imagePath;
  public message: string;
  associadoPai: any;
  @Output() BackList = new EventEmitter<string>();

  public imgURL: any;
  public titulo: string;
  public boxBloqueio: false;
  public bloqueioDe: string;
  public bloqueioAte: string;
  public submitted: boolean;
  public mensagem = null;
  public items = [];
  public loading = false;
  public isNew = true;
  public erro: boolean;
  public success: boolean;

  preview(files) {
    if (files.length === 0)
      return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Apenas imagens são permitidas";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }
  }

  doSomething() {
    alert(2);
  }

  get f() { return this.edithForm.controls; }

  GoList = function () {
    this.BackList.emit(true);
  }

  edithForm = this.fb.group(
    {
      associadoId: ['0'],
      nrFuncional: [''],
      nome: ['', Validators.required],
      email: ['', Validators.email],
      dataNascimento: [null],
      sexo: ['M'],
      tipoPessoa: [''],
      codTitular: [''],
      sequenciaDependente: [''],
      estadoCivil: [''],
      associadoIdPai: [''],
      dtInicioFeriasLicensa: [null],
      tipoDocumento: [''],
      cpf: ['', Validators.required],
      codDepartamento: [''],
      departamento: [''],
      localTrabalho: [''],
      poloAdministrativo: [''],
      codEmpresa: [''],
      indFolha: [''],
      banco: [''],
      agencia: [''],
      contaCorrente: [''],
      contaCorrenteDig: [''],
      imagem: [''],
      telefone: [''],
      senha: [''],
      trocaSenha: [''],
      bloqueado: ['false'],
      dataInclusao: [new Date()],
      dataUltimaAlteracao: [new Date()],
      dataUltimaTrocaSenha: [new Date()],
      dataUltimoLogin: [new Date()],
      ativo: ['true'],
      primeiroAcesso: [''],
      statusAprovacaoId: [''],
      faixaSalarial: [''],
      exibeTourInscricao: ['true'],
      tipoDependente: [''],
      exibeTourIngresso: ['true'],
      permiteEmailComunicacoes: ['true'],
      origemBanco: [''],
      associadosDocumentos: [''],
      associadosFluxo: [null],
      bloqueioPrimeiroAcesso: [''],
      eventosInscricoes: [''],
      examesAssociadosVisitantes: [''],
      lancamentos: [''],
      dependentes: []
    });

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private associadoService: AssociadoService,
    private help: HelperService,
    private workflowFluxoService: WorkflowFluxoService,
    private workflowService: WorkflowService,

  ) { }


  OpenBloqueio = function () {
    this.boxBloqueio = !this.boxBloqueio;
    console.log(this.boxBloqueio);
  }

  OpenFile = function () {
    var t = document.getElementById('fileAvatar');
    t.click();
  }

  onSubmit() {
    console.log("ENTROU NO SALVAR")

    this.loading = true;
    var jsonx = this.edithForm.value;
    var dt = new Date();
    var dt2 = new Date();
    dt2.setMonth(dt2.getMonth() + 1);

    this.bloqueioDe = this.help.ToDateInput(dt);
    this.bloqueioAte = this.help.ToDateInput(dt2);
    this.submitted = true;

    if (this.edithForm.invalid) {
      console.log("INVALIDO ONDE ?", this.edithForm.invalid)
      this.loading = false;
      return;
    }

    delete jsonx.senha;
    delete jsonx.trocaSenha;
    delete jsonx.dataUltimoLogin;

    if (jsonx.associadoId > 0) {
      console.log("Model Preenchida (EDITAR)", this.associado);

      this.associadoService.edit(this.associado).subscribe(p => {
        this.mensagem = "Informações atualizadas com êxito !";
        setTimeout(() => {
          javascript: history.go(-1);
        }, 2000);
      });

    }
    else {
      jsonx.associadoIdPai = this.associadoPai;
      console.log("Model Preenchida (CADASDTRO):", jsonx);
      this.associadoService.insert(jsonx).subscribe(p => {
        this.mensagem = "Registro incluído com êxito !";
        setTimeout(() => {
          javascript: history.go(-1);
        }, 2000);
      });

    }

  }

  LoadData = function (id = 0) {
    let _id = 0;
    this.mensagem = null;
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        _id = c.get('id');
      }
      if (id! = 0) {
        _id = id;
      }
      if (_id > 0) {
        this.editMode = true;
        this.loading = true;
        this.titulo = "Editar Cadastro - Beneficiário  Titular";

        console.log("ATRIBUINDO PAI 1:", this.associadoPai);

        this.associadoService.getId(_id).subscribe(x => {
          this.associado = x
          this.associado.dataNascimento = x.dataNascimento;
          var dt = new Date(x.dataNascimento);
          x.dataNascimento = this.help.ToDateInput(dt);
          console.log("DEPENDENTE FORMULARIO : ", this.associado)

          if (this.associado.statusAprovacaoId != 2) {
            this.exibirBotao = true;
          }

          if (this.associado.associadoIdPai == null) {
            this.associado = [];
            this.titulo = "Novo Cadastro - Beneficiário  Titular";
            console.log("É PARA INCLUIR UM NOVO DEPENDENTE")
            console.log("ATRIBUINDO PAI 2:", this.associadoPai);
            console.log("LIMPOU ?:", this.associado);

          }

          this.loading = false;
        });
      }
      else {
        var dt = new Date();
        var nasc = this.help.ToDateInput(dt);
        this.f['dataNascimento'].setValue(nasc);
        this.editMode = false;
      }
    });
  }

  backPage() {
    javascript: history.go(-1);
  }

  ngOnInit() {
    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.associadoService.getAll(String(params.get('funcional')), null, '').subscribe(x => {
          this.associadoPai = params.get('id');
          this.LoadData();
          console.log("Parametro recebido", this.associadoPai)
        });
      }
    });

  }

  aprovar() {
    this.buscaFluxoDependente();
    this.atualizaStatusAssociado();

    this.mensagem = "Dependente aprovado com sucesso !";
    setTimeout(() => {
      this.backPage();
    }, 2000);
  }

  atualizaStatusAssociado() {
    this.associado.statusAprovacaoId = 2;

    this.associadoService.edit(this.associado).subscribe(p => {
      this.loading = false;
      this.mensagem = "Aprovado";
    });
  }

  buscaFluxoDependente() {
    let workFlowId;

    this.associadoService.getAllWithParameter(this.associado.associadoId).subscribe(x => {
      this.associado = x[0];
      console.log("Associado", this.associado)

      this.workflowService.getAll(null, null, this.associado.associadoId.toString()).subscribe(q => {
        console.log("Consulta no worflow", q);
        workFlowId = q[0].workFlowId;

        this.workflowFluxoService.getAll(null, workFlowId).subscribe(w => {
          this.workFlowFluxo = w[0];
          console.log("WORKFLOWFLUXO:", this.workFlowFluxo)

          this.editarFluxo();
          this.inserirFluxo();

        });
      })
      

    });
  }

  editarFluxo() {
    this.workFlowFluxo.ativo = false;
    console.log("EDIT:", this.workFlowFluxo)
    this.workflowFluxoService.edit(this.workFlowFluxo).subscribe(c => {
    });
  }

  inserirFluxo() {
    console.log("INSERT:", this.workFlowFluxo);
    this.workFlowFluxo.usuarioId = 1;
    this.workFlowFluxo.observacao = ""
    this.workFlowFluxo.workFlowFluxoId = 0;
    this.workFlowFluxo.statusAprovacaoId = 2;
    this.workflowFluxoService.insert(this.workFlowFluxo).subscribe(c => {
      this.loading = false;
      this.mensagem = "Registro inserido com sucesso";
    });
  }

}