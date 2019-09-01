import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Associado } from 'src/app/models/Associado';
import { CommonService } from 'src/app/services/common.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isUndefined } from 'util';
import { AssociadoService } from 'src/app/services/associados.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.sass']
})
export class ColaboradoresComponent implements OnInit {
  public associados: Associado = new Associado();
  public lstAssociados: Associado[] = [];
  public permissions: Permissions = new Permissions();
  public error = false;
  public mensagem = '';
  public isNew = false;
  public success = false;
  public date = new Date();
  public hoje = new Date();

  public showDesmarcar = true;
  public showMarcar = false;

  //ATRIBUTOS DOS CHECKBOX

  //CHECKBOX
  public chkCpf: boolean;
  public chkNrFuncional: boolean;
  public chkNome: boolean;
  public chkEmail: boolean;
  public chkTipoPessoa: boolean;
  public chkAssociadoPai: boolean;
  public chkDataNascimento: boolean;
  public chkSexo: boolean;
  public chkEstadoCivil: boolean;
  public chkTelefone: boolean;
  public chkFaixaSalarial: boolean;
  public chkTipoDependente: boolean;

  //DATAS
  public final: string;
  public inicio: string;

  //CMB
  public cmbSituacao: any;
  public cmbTipoAssociado: String;
  public cmbSexo: String;
  public cmbNome: String;
  public cmbCpf: String;
  public erro: boolean;
  public loading = false;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
  };

  constructor(
    private associadoServico: AssociadoService,
    private router: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthenticationService) { }//CONSTRUTOR

  ngOnInit() {

    //INICIAR O LOAD
    this.loading = true;

    //MODEL DE ASSOCIADOS
    this.associados.codTitular = '';
    this.associados.sequenciaDependente = '';
    this.associados.nrFuncional = '';
    this.associados.nome = '';
    this.associados.email = '';
    this.associados.tipoPessoa = '';
    this.associados.associadoIdPai = '';
    this.associados.dataInclusao = new Date();
    this.associados.sexo = '';
    this.associados.estadoCivil = '';
    this.associados.dtInicioFeriasLicensa = '';
    this.associados.tipoDocumento = '';
    this.associados.cpf = '';
    this.associados.departamento = '';
    this.associados.codDepartamento = '';
    this.associados.localTrabalho = '';
    this.associados.poloAdministrativo = '';
    this.associados.codEmpresa = '';
    this.associados.indFolha = '';
    this.associados.banco = '';
    this.associados.agencia = '';
    this.associados.contaCorrente = '';
    this.associados.contaCorrenteDig = '';
    this.associados.imagem = '';
    this.associados.telefone = '';
    this.associados.senha = '';
    this.associados.senha = '';
    this.associados.bloqueado = null;
    this.associados.dataInclusao = new Date();
    this.associados.dataUltimaAlteracao = new Date();
    this.associados.dataUltimaTrocaSenha = new Date();
    this.associados.dataUltimoLogin = '';
    this.associados.ativo = null;
    this.associados.primeiroAcesso = null;
    this.associados.statusAprovacaoId = null;
    this.associados.faixaSalarial = '';
    this.associados.exibeTourInscricao = null;
    this.associados.tipoDependente = null;
    this.associados.exibeTourIngresso = null;
    this.associados.permiteEmailComunicacoes = null;
    this.associados.origemBanco = null;
    this.associados.associadosDocumentos = null;
    this.associados.associadosFluxo = null;
    this.associados.bloqueioPrimeiroAcesso = null;
    this.associados.eventosInscricoes = null;
    this.associados.examesAssociadosVisitantes = null;
    this.associados.lancamentos = null;
    this.associados.dependentes = null;

    //CPNTEXTO DOS CHECKBOX
    this.chkCpf = true;
    this.chkNrFuncional = true;
    this.chkNome = true;
    this.chkEmail = true;
    this.chkTipoPessoa = true;
    this.chkAssociadoPai = true;
    this.chkDataNascimento = true;
    this.chkSexo = true;
    this.chkEstadoCivil = true;
    this.chkTelefone = true;
    this.chkFaixaSalarial = true;
    this.chkTipoDependente = true;

    //INICIAR COMBOBOX
    this.cmbSituacao = "";
    this.cmbTipoAssociado = "";
    this.cmbSexo = "";
    this.cmbNome = "";
    this.cmbCpf = "";

    this.authService.verificarPermissao('Grupos').then(c => {
       this.permissions.btnCadastrar = c; 
      }).catch(this.handleError);

    this.loading = false;
  }//ONINIT

  gerarExcel() {
    this.loading = true;
    // CRIANDO OS CAPOS DE VALIDA«√O
    var campos = "";

    if (this.chkCpf == true) {
      campos += "a.cpf,";
    }
    if (this.chkNrFuncional == true) {
      campos += "a.nrFuncional,";
    }
    if (this.chkNome == true) {
      campos += "a.nome,";
    }
    if (this.chkEmail == true) {
      campos += "a.email,";
    }
    if (this.chkTipoPessoa == true) {
      campos += "a.tipoPessoa,";
    }
    if (this.chkAssociadoPai == true) {
      campos += "a.associadoIdPai,";
      campos += "a1.Nome,";
      campos += "a1.Cpf,";

    }
    if (this.chkDataNascimento == true) {
      campos += "a.dataNascimento,";
    }
    if (this.chkSexo == true) {
      campos += "a.sexo,";
    }
    if (this.chkEstadoCivil == true) {
      campos += "a.estadoCivil,";
    }
    if (this.chkTelefone == true) {
      campos += "a.telefone,";
    }
    if (this.chkFaixaSalarial == true) {
      campos += "a.faixaSalarial,";
    }
    if (this.chkTipoDependente == true) {
      campos += "a.tipoDependente,";
      campos += "a.ativo,";

    }
    
    if (!this.isValidDate(this.final, campos)) {
      this.loading = false;
      return;
    }

    if (this.inicio == "" || this.inicio == undefined || this.inicio == null) {
      this.inicio = "01/01/1990";
    }

    if (this.final == "" || this.final == undefined || this.final == null) {
      this.final = "01/01/2060";
    }

    var dini: any = this.inicio;
    var dfim: any = this.final;

    var dataPost = {
      'TipoAssociado': this.cmbTipoAssociado,
      'DataNascInicio': dini.formatted,
      'DataNascFim': dfim.formatted,
      'Sexo': this.cmbSexo,
      'Situacao': this.cmbSituacao,
      'Nome': this.cmbNome,
      'Cpf': this.cmbCpf,
      'Campos': campos
    }
    this.loading = true;
    console.log("Enviando Oq ?", dataPost);

    this.associadoServico.gerarExcel(dataPost).subscribe(
      blob => {
        let binaryData = [];
        binaryData.push(blob);
        let downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
        downloadLink.setAttribute('download', 'Associados.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.loading = false;

        javascript : history.go(0);
        
      },
      error => {
        console.log("Algo deu errado com o download do arquivo excel.");
      });
    this.erro = false;
    this.mensagem = `A data inicial não pode ser menor que a final.\n`;
  }

  Mascara() {
    this.commonService.MascaraData(document.getElementById('txtDataEnvioInicio'));
    this.commonService.MascaraData(document.getElementById('txtDataEnvioFim'));
  }

  desmarcarTodos() {
    this.showMarcar = true
    this.showDesmarcar = false;

    this.chkCpf = false;
    this.chkNrFuncional = false;
    this.chkNome = false;
    this.chkEmail = false;
    this.chkTipoPessoa = false;
    this.chkAssociadoPai = false;
    this.chkDataNascimento = false;
    this.chkSexo = false;
    this.chkEstadoCivil = false;
    this.chkTelefone = false;
    this.chkFaixaSalarial = false;
    this.chkTipoDependente = false;
  }

  marcarTodos() {
    this.showDesmarcar = true;
    this.showMarcar = false;

    this.chkCpf = true;
    this.chkNrFuncional = true;
    this.chkNome = true;
    this.chkEmail = true;
    this.chkTipoPessoa = true;
    this.chkAssociadoPai = true;
    this.chkDataNascimento = true;
    this.chkSexo = true;
    this.chkEstadoCivil = true;
    this.chkTelefone = true;
    this.chkFaixaSalarial = true;
    this.chkTipoDependente = true;
  }

  isValidDate(obj: any, campos: any) {
    //VALIDA AS DATAS DE INIVIO E DE FINAL
    if (this.inicio !== '' || this.final !== '') {
      if (this.inicio !== '' && this.final !== '') {
        if (this.inicio > this.final) {

          if (isUndefined(this.mensagem))
            this.mensagem = '';

          this.erro = true;
          this.mensagem = `A data inicial n„o pode ser menor que a final.\n`;
          return false;
        }
        if (this.inicio < '10/10/1989' || this.final < '10/10/1989') {
          if (isUndefined(this.mensagem))
            this.mensagem = '';

          this.erro = true;
          this.mensagem = `A data n„o pode ser menor que 10/10/1989.\n`;
          return false;
        }
      }
    }

    //VERIFICA SE FOI MARCADO ALGUM CHECKBOX
    if (campos === '' || campos == null) {
      if (isUndefined(this.mensagem))
        this.mensagem = '';
      this.erro = true;
      this.mensagem = `VocÍ deve selecionar um checkbox.\n`;
      return false;
    }
    return true;
  }

  private handleError() {
    location.href = '/login';
  }
}
export class Permissions {
  btnCadastrar: boolean;
}


