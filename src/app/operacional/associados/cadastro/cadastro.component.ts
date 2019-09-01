import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormArray } from '@angular/forms';
import { AssociadoService } from 'src/app/services/associados.service';
import { HelperService } from '@app/services/helper.service'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Associado } from '@app/models/Associado';
import { AssociadoBloqueio } from '@app/models/AssociadoBloqueio';
import { BloqueioFrequentadoresService } from '@app/services/bloqueio-frequentadores.service';
import { BloqueioFrequentadores } from '@app/models/BloqueioFrequentadores';


declare var $: any;
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public editMode = false;
  public associado: Associado = new Associado();
  public associadoBloqueio: AssociadoBloqueio = new AssociadoBloqueio();
  public bloqueioFrequentadores: BloqueioFrequentadores = new BloqueioFrequentadores();
  public dependentes: Dependentes = new Dependentes();
  public dependentesL: Dependentes[] = [];


  public imagePath;
  public message: string;
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
      dependentes: [],

      inicioBloqueio: [new Date()],
      fimBloqueio: [new Date()],
      descricaoBloqueio: ""
    });

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private fb: FormBuilder,
    private associadoService: AssociadoService,
    private bloqueioFrequentadoresService: BloqueioFrequentadoresService,
    private help: HelperService
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
    delete jsonx.inicioBloqueio;
    delete jsonx.fimBloqueio;
    delete jsonx.descricaoBloqueio;

    if (jsonx.associadoId > 0) {
      console.log("Model Preenchida (EDITAR)", jsonx);
      this.associadoService.edit(jsonx).subscribe(p => {
        setTimeout(() => {
          this.route.navigate(['/operacional/associados']);
        }, 2000);

      });
    }
    else {
      console.log("Model Preenchida (CADASDTRO):", jsonx);
      this.associadoService.insert(jsonx).subscribe(p => {
        this.mensagem = "Registro incluído com êxito !";
        setTimeout(() => {
          this.route.navigate(['/operacional/associados']);
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

        this.associadoService.getId(_id).subscribe(x => {
          this.associado = x

          this.associadoPai = this.associado.associadoIdPai;

          var dt = new Date(x.dataNascimento);
          var ferias = new Date(x.dtInicioFeriasLicensa);
          // this.items = x.dependentes;

          x.dependentes.forEach(d => {
            this.dependente = new Dependentes();

            if(d.statusAprovacaoId == 1) {
              this.dependentes = d;
              this.dependentes.poloAdministrativo= "Pendente";
              this.dependentesL.push(this.dependentes);
            }

            if (d.statusAprovacaoId == 2) {
              this.dependentes = d;
              this.dependentes.poloAdministrativo = "Aprovado";
              this.dependentesL.push(this.dependentes);
            }

            if (d.statusAprovacaoId == 3) {
              this.dependentes = d;
              this.dependentes.poloAdministrativo = "Reprovado";
              this.dependentesL.push(this.dependentes);
            }

          });

          x.dataUltimoLogin = new Date(x.dataUltimoLogin).toLocaleDateString();
          x.dataNascimento = this.help.ToDateInput(dt);
          x.dtInicioFeriasLicensa = this.help.ToDateInput(ferias);

          this.loading = false;
        });
      }
      else {
        this.titulo = "Novo Cadastro - Beneficiário  Titular";
        var dt = new Date();
        var nasc = this.help.ToDateInput(dt);
        this.f['dataNascimento'].setValue(nasc);
        this.editMode = false;
      }
    });
  }

  ngOnInit() {
    this.LoadData();
  }

  goToDependente(id: any) {
    console.log("ID DO CARA:", id);
    this.route.navigate(['/operacional/dependente/cadastro/', id])
  }

  bloquear() {
    this.bloqueioFrequentadores.bloqueioFrequentadorId = 0;
    this.bloqueioFrequentadores.frequentadorId = this.associado.associadoId;
    this.bloqueioFrequentadores.tipoPessoaId = 1;
    this.bloqueioFrequentadores.nome = this.associado.nome;
    this.bloqueioFrequentadores.cpf = this.associado.cpf;
    this.bloqueioFrequentadores.dataCadastro = this.associado.dataInclusao;
    this.bloqueioFrequentadores.ativo = true;
    this.bloqueioFrequentadores.usuarioId = 1;
    this.bloqueioFrequentadores.dataInicio = this.edithForm.value.inicioBloqueio;
    this.bloqueioFrequentadores.dataFim = this.edithForm.value.fimBloqueio;
    this.bloqueioFrequentadores.descricao = this.edithForm.value.descricaoBloqueio;

    this.bloqueioFrequentadoresService.insertbloqueioFrequentador(this.bloqueioFrequentadores).subscribe(p => {
      this.mensagem = "Registro bloqueado com êxito !";
    });
  }

  buscaBloqueios() {
    console.log("ID ASSOCIADO", this.associado.associadoId)
    this.bloqueioFrequentadoresService.getAllWithParameter(this.associado.associadoId).subscribe(x => {
      this.bloqueioFrequentadores = x

    });
  }

}

export class Dependentes {
  nome: string;
  dependenteId: any;
  grauParentesco: any;
  status: any;
}