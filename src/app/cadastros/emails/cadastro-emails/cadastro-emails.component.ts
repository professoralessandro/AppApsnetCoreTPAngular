import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MailingMails } from 'src/app/models/MailingMails';
import { EmailService } from 'src/app/services/email.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';


export class Permissions {
  btnCadastrar: boolean;
}


@Component({
  selector: 'app-cadastrar-emails',
  templateUrl: './cadastro-emails.component.html',
  styleUrls: ['./cadastro-emails.component.scss']
})


export class CadastroemailsComponent implements OnInit {
  public loading = false;
  public emails: MailingMails = new MailingMails();
  public listaMailingMails: MailingMails[] = [];
  permissions: Permissions = new Permissions();
  error = false;
  mensagem = '';
  isNew = false;
  success = false;


  public Editor1 = ClassicEditor;
  public Editor2 = ClassicEditor;
  public Editor3 = ClassicEditor;


  constructor(
    private emailServico: EmailService,
    private router: ActivatedRoute,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.emails.assinatura = '';
    this.emails.assunto = '';
    this.emails.ativo = true;
    this.emails.cabecalho = '';
    this.emails.dataAlteracao = new Date();
    this.emails.dataExclusao = new Date();
    this.emails.dataInclusao = new Date();
    this.emails.descricao = '';
    this.emails.mailingEmailId = 0;
    this.emails.mensagem = '';
    this.emails.mensagemId = 0;
    this.emails.nomeLote = '';
    this.emails.usuarioIdAlteracao = 0;
    this.emails.usuarioIdExclusao = 0;
    this.emails.usuarioIdInclusao = 0;
    this.emails.usuarioResponsavelCadastro = '';
    this.emails.usuarioResponsavelEnvio = '';
    this.error = false;
    this.mensagem = '';
    this.isNew = true;
    this.error = false;
    this.mensagem = '';


    this.authService.verificarPermissao('Grupos').then(c => {this.permissions.btnCadastrar = c; });


    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.emailServico.getAll(
          Number(c.get('id')),
          null,
          null,
          null
        ).subscribe(x => {
          this.loading = false;
          this.emails = x[0];
          this.isNew = false;
        });
      }
      else
      {
        this.loading = false;
      }
    });
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

  buscar()
  {
    this.loading = true;
    this.listaMailingMails = [];

    this.emailServico.getAll(
      this.emails.mailingEmailId
      , this.emails.descricao
      , this.emails.assunto
      , this.emails.ativo
    ).subscribe(c => {
      this.loading = true;
    this.listaMailingMails = c;
    if (c.length === 0) {
        this.error = true;
        this.mensagem = 'Não há registros para o critério de busca informado!';
      }
    });
  }


  cadastrarEmail() {
    this.loading = true;;
    this.success = false;
    this.mensagem = '';
    if (this.isNew) {
      this.emailServico.insert(this.emails).subscribe(c => {
        this.loading = false;;
        this.success = true;
        this.mensagem = ('Registro inserido com sucesso.');
      });
    } else {
      this.emailServico.edit(this.emails).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
      });
    }
  }
}

