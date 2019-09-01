import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from 'src/app/services/email.service';
import { MailingMails } from 'src/app/models/MailingMails';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { stringify } from '@angular/compiler/src/util';

export class Permissions {
  btnCadastrar: boolean;
}

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss']
})
export class MailingMailsComponent implements OnInit {
  public loading = false;
  public emails: MailingMails = new MailingMails();
  public listaMailingMails: MailingMails[] = [];
  permissions: Permissions = new Permissions();
  error = false;
  mensagem = "";


  constructor(
    private emailServico: EmailService,
    private alertService: AlertService,
    private router: ActivatedRoute,
    private authService: AuthenticationService) { }


  ngOnInit() {
    this.loading = true;
    this.emails.assinatura = "";
    this.emails.assunto = "";
    this.emails.ativo = true;
    this.emails.cabecalho = "";
    this.emails.dataAlteracao = new Date();
    this.emails.dataExclusao = new Date();
    this.emails.dataInclusao = new Date();
    this.emails.descricao = "";
    this.emails.mailingEmailId = null;
    this.emails.mensagem = "";
    this.emails.mensagemId = 0;
    this.emails.nomeLote = "";
    this.emails.usuarioIdAlteracao = 0;
    this.emails.usuarioIdExclusao = 0;
    this.emails.usuarioIdInclusao = 0;
    this.emails.usuarioResponsavelCadastro = "";
    this.emails.usuarioResponsavelEnvio = "";
    this.error = false;
    this.mensagem = "";

    this.authService.verificarPermissao('Grupos').then(c => {this.loading = false; this.permissions.btnCadastrar = c; });
  }



  buscar() {
    this.loading = true;
    this.listaMailingMails = [];

    this.emailServico.getAll(
      this.emails.mailingEmailId
      , this.emails.descricao
      , this.emails.assunto
      , this.emails.ativo
    ).subscribe(c => {
      this.loading = false;
      this.listaMailingMails = c;
      if (c.length == 0) {
        this.error = true;
        this.mensagem = "Não há registros para o critério de busca informado!";
      }
    });
  }
}

