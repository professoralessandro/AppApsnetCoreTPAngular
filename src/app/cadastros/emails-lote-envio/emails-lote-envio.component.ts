import { Component, OnInit } from '@angular/core';
import { MailingLoteEnvios } from 'src/app/models/MailingLoteEnvios';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmailsLoteEnvioService } from 'src/app/services/emails-lote-envio.service';
import { CommonService } from 'src/app/services/common.service';
import { isUndefined } from 'util';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-emails-lote-envio',
  templateUrl: './emails-lote-envio.component.html',
  styleUrls: ['./emails-lote-envio.component.scss']
})

export class EmailsLoteEnvioComponent implements OnInit {
  public loading = false;
  public lstMailingLoteEnvios: MailingLoteEnvios[] = [];
  public mailingLoteEnvios: any = new MailingLoteEnvios();
  permissions: Permissions = new Permissions();

  constructor(
    private emailsLoteEnvioService: EmailsLoteEnvioService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) { }

  public required: boolean = false;
  public dataEnvioFim: string = '';
  public success: boolean;
  public erro: boolean;
  public nenhumRegistro: boolean;
  public confirmacao: boolean;
  public mensagem: string = '';
  public confirmarDelecao: boolean = false;
  public formularioPrincipal: boolean = true;
  public idEmailLoteDelecao: number = 0;


  ngOnInit() {
    this.loading = true;
    this.mailingLoteEnvios.mailingEmailId = '';
    this.mailingLoteEnvios.nomeLote = '';
    this.mailingLoteEnvios.dataEnvio = '';
    this.mailingLoteEnvios.dataEnvio = '';
    this.mailingLoteEnvios.statuId = 0;
    this.mailingLoteEnvios.ativo = true;

    this.authService.verificarPermissao('Grupos')
      .then(c => { this.loading = false; this.permissions.btnCadastrar = c; }).catch(this.handleError);
  }

  handleError() {
    location.href = '/login';
  }

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  CadastrarNovo() {
    this.loading = true;
    location.href = 'cadastros/cadastro-emails-lote-envio';
    this.loading = false;
  }

  ValidarData(obj: any) {
    var today = new Date();

    if (obj.value.toString().trim() == '') {
      return true;
    }

    if (obj.value.toString().trim().length < 10) {
      this.erro = true;
      if (isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem = `Data inválida.\n`;
      return false;
    }

    if (isNaN(Date.parse(obj.value.toString().trim()))) {
      this.erro = true;
      if (isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem = `Data inválida.\n`;
      return false;
    }

    if ((today.getMonth() + 1) > 12 && isNaN(Date.parse(obj.value.toString().trim()))) {
      this.erro = true;
      if (isUndefined(this.mensagem))
        this.mensagem = '';

      this.mensagem = `Data inválida.\n`;
      return false;
    }

    return true;
  }

  getAll()
  {
    this.lstMailingLoteEnvios = [];
    this.emailsLoteEnvioService.getAll(this.mailingLoteEnvios.mailingEmailId,
      this.mailingLoteEnvios.nomeLote,
      this.mailingLoteEnvios.dataEnvio,
      this.mailingLoteEnvios.dataEnvio,
      this.mailingLoteEnvios.statuId,
      this.mailingLoteEnvios.ativo
      
    ).subscribe(c => {

      c.forEach(x => {
        this.loading = false;
        const item: MailingLoteEnvios = new MailingLoteEnvios();
        item.mailingLoteEnvioId = x.mailingLoteEnvioId;
        item.nomeLote = x.nomeLote;
        item.dataEnvio = x.dataEnvio;
        item.qtdEnvios = x.qtdEnvios;
        item.statuId = x.statuId;
        item.ativo = x.ativo;
        //item.dataFormatada = x.dataFormatada;
        item.statusDescricao = x.statusDescricao;

        this.lstMailingLoteEnvios.push(item);
      });

      if (c.length > 0) {
        this.nenhumRegistro = false;
      }
      else {
        this.nenhumRegistro = true;
      }
    },
      error => {
        //this.alertService.error(['Ocorreu um erro ao chamar o serviço']);
      });
  }

  buscar()
  {
    this.loading = true;

    this.confirmacao = false;
    this.nenhumRegistro = false;
    this.erro = false;
    this.success = false;


    let txtDataEnvioInicio: any = document.getElementById('txtDataEnvioInicio');
    let txtDataEnvioFim: any = document.getElementById('txtDataEnvioFim');

    this.getAll();
  }

  Mascara() {
    this.commonService.MascaraData(document.getElementById('txtDataEnvioInicio'));
    this.commonService.MascaraData(document.getElementById('txtDataEnvioFim'));
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  ConfirmarDelecao(Id: number, nomeLote: string)
  {
    this.loading = true;
    if (nomeLote.trim().length > 20) {
      nomeLote = nomeLote.slice(0, 19) + `-\n` + nomeLote.slice(19, nomeLote.length - 1);
    }

    this.idEmailLoteDelecao = Id;
    this.mensagem = `Deseja realmente excluir o lote ` + nomeLote + `?`;

    this.formularioPrincipal = false;
    this.confirmarDelecao = true;

    this.required = false;
    this.success = false;
    this.confirmacao = true;
    this.loading = false;
  }

  NaoDeletar() {
    this.formularioPrincipal = true;
    this.confirmacao = false;
    this.required = false;
    this.success = false;
    this.erro = false;
  }

  Deletar() {
    this.confirmacao = false;
    this.nenhumRegistro = false;
    this.erro = false;
    this.success = false;

    this.emailsLoteEnvioService.delete(this.idEmailLoteDelecao).subscribe(c => {
      this.success = true;
      this.confirmacao = false;
      this.formularioPrincipal = true;
      this.mensagem = `Deleção realizada com sucesso.`;

      this.getAll();
    }),
      error => {
        this.formularioPrincipal = true;
      };
  }
}


export class Permissions {
  btnCadastrar: boolean;
}