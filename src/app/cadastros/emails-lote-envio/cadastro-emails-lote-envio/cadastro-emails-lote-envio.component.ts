import { Component, OnInit } from '@angular/core';
import { MailingLoteEnvios } from 'src/app/models/MailingLoteEnvios';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { EmailsLoteEnvioService } from 'src/app/services/emails-lote-envio.service';
import { CommonService } from 'src/app/services/common.service';
import { isUndefined } from 'util';
import { MailingMails } from 'src/app/models/MailingMails';
import { Validators, FormGroup, FormArray } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { MailingLoteEnvioDestinatarios } from 'src/app/models/MailingLoteEnvioDestinatarios';
import { AssociadoService } from '@app/services/associados.service';

@Component({
  selector: 'app-emails-lote-envio',
  templateUrl: './cadastro-emails-lote-envio.component.html',
  styleUrls: ['./cadastro-emails-lote-envio.component.scss']
})

export class CadastroEmailsLoteEnvioComponent implements OnInit {
  public loading = false;

  public lstMailingLoteEnvios: MailingLoteEnvios[] = [];
  public mailingLoteEnvios: any = new MailingLoteEnvios();
  permissions: Permissions = new Permissions();
  public dataIn: any;
  public nome: string;
  public blockAdd: boolean;
  public idInsert: number;
  public mailingDestinatarios: MailingLoteEnvioDestinatarios[] = [];

  constructor(
    private emailsLoteEnvioService: EmailsLoteEnvioService,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private associadosService: AssociadoService
  ) { }


  public IsNew: boolean = false;
  public mailingMail: MailingMails = new MailingMails();
  public imagem: string;
  public required: boolean;
  public success: boolean;
  public erro: boolean;
  public mensagem: string;
  public selected: number;
  public formularioPrincipal: boolean = true;
  public lstMailingMails: MailingMails[] = [];
  public tabFalhasCss: string = '';
  public tabDestinatariosCss: string = 'active panevalores';
  public dataInclusao: any;
  public dataEnvio: any;
  public dataFim: any;

  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;


  ngOnInit() {
    this.loading = true;
    this.nome = '';
    this.mailingLoteEnvios.ativo = true;
    this.CarregaMensagens().then(z => {
      this.activatedRoute.paramMap.subscribe(c => {
        this.loading = false;
        if (c.get('id') == null) {

          this.mailingLoteEnvios.mailingEmailId = '';
          this.mailingLoteEnvios.nomeLote = '';
          this.mailingLoteEnvios.dataEnvio = '';
          this.mailingLoteEnvios.dataEnvio = '';
          this.mailingLoteEnvios.statuId = 0;
          this.mailingLoteEnvios.ativo = true;

          this.IsNew = true;
        }
        else {
          this.emailsLoteEnvioService.getAll(Number(c.get('id')), '', null, null, 0, null).toPromise().then(x => {
            this.loading = false;
            this.mailingLoteEnvios = x[0];

            this.buscarDestinatarios();

            this.emailsLoteEnvioService.getUsuarioById(
              this.mailingLoteEnvios.usuarioIdInclusao
            ).then(v => {
              this.mailingLoteEnvios.usuarioResponsavelCadastro = v.nome;
            });

            let start: Date = new Date(x[0].dataEnvio);

            if (x[0].dataEnvio !== null) {
              this.dataEnvio = {
                date: {

                  year: start.getFullYear(),
                  month: start.getMonth() + 1,
                  day: start.getDate()

                }
              };
            }

            start = new Date(x[0].dataInclusao);

            if (x[0].dataInclusao !== null) {
              this.dataIn = {
                date: {

                  year: start.getFullYear(),
                  month: start.getMonth() + 1,
                  day: start.getDate()

                }
              };
            }
          });

          this.IsNew = false;
        }
      });

    });

    this.dataSource = Observable.create((observer: any) => {
      return this.associadosService.getAll(null, this.nome, true, null, 1)
        .subscribe((result: any) => {
          observer.next(result.items);
        });
    });

    this.authService.verificarPermissao('Grupos')
      .then(c => { this.permissions.btnCadastrar = c; }).catch(this.handleError);
  }

  handleError() {
    location.href = '/login';
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
    this.blockAdd = false;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.nome = e.item.nome;
    this.idInsert = e.item.associadoId;
    console.log(this.idInsert);
    this.blockAdd = false;
  }

  tabDestinatarios() {
    this.tabFalhasCss = '';
    this.tabDestinatariosCss = 'active panevalores';

    this.exibirTabDestinatatarios = true;
    this.exibirTabFalhas = false;
  }

  tabFalhas() {
    this.tabFalhasCss = 'active panevalores';
    this.tabDestinatariosCss = '';

    this.exibirTabDestinatatarios = false;
    this.exibirTabFalhas = true;
  }

  public exibirTabFalhas: boolean = true;
  public exibirTabDestinatatarios: boolean = false;

  EnviarTodos() {
    if (this.mailingLoteEnvios.enviarTodos) {
      this.exibirTabFalhas = true;
      this.exibirTabDestinatatarios = false;

      this.tabFalhasCss = 'active panevalores';
      this.tabDestinatariosCss = '';
    }
    else {
      this.exibirTabFalhas = false;
      this.exibirTabDestinatatarios = true;

      this.tabFalhasCss = '';
      this.tabDestinatariosCss = 'active panevalores';
    }
  }

  CarregaMensagens()
  {
    return this.emailsLoteEnvioService.getMensagens().toPromise().then(mm => {
      // this.mailingMail.mailingEmailId = -1 ;dd
      this.lstMailingMails = mm;
    },
      error => {
      });
  }

  Voltar() {
    location.href = './cadastros/emails-lote-envio';
  }

  Validar() {
   return true;
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

  EnviarEmails() {
    console.log(this.mailingLoteEnvios.mailingLoteEnvioId);
    this.emailsLoteEnvioService.sendEmails(this.mailingLoteEnvios.mailingLoteEnvioId)
    .toPromise().then(c => {
      this.success = true;
      this.erro = false;
      this.mensagem = 'E-mails enviados para a fila de envio.';

      const user: any = JSON.parse(localStorage.getItem('currentUser'));
      this.mailingLoteEnvios.responsavelEnvio = user.user.usuarioId;
      this.mailingLoteEnvios.usuarioResponsavelEnvio = user.user.nome;
      this.mailingLoteEnvios.statuId = 2;
      this.emailsLoteEnvioService.edit(this.mailingLoteEnvios).toPromise().then(x => {
      }).catch(x => {
      });

    }).catch(x => {
      this.mensagem = 'Houve um erro ao inserir os e-mails para envio.';
      this.erro = true;
      this.success = false;
    });
  }

  CadastrarEmailLoteEnvio()
  {
    this.loading = true;
    if (this.Validar()) {
      const user: any = JSON.parse(localStorage.getItem('currentUser'));

      if (this.IsNew) {
        // lat.usuarioResponsavel = user.user.nome;

        // this.mailingLoteEnvios.mailingEmailId = this.mailingMail.mailingEmailId;
        this.mailingLoteEnvios.statuId = 3; // Pendente de Envio
        this.mailingLoteEnvios.statusDescricao = `Pendente de Envio`;
        this.mailingLoteEnvios.usuarioIdInclusao = user.user.usuarioId;
        this.mailingLoteEnvios.usuarioIdAlteracao = user.user.usuarioId;
        this.mailingLoteEnvios.usuarioResponsavelCadastro = user.user.nome;
        this.emailsLoteEnvioService.insert(this.mailingLoteEnvios).subscribe(mm => {
          this.loading = false;
          this.mailingLoteEnvios = mm;
          this.dataIn = {
            date: {

              year: mm.dataInclusao.getFullYear(),
              month: mm.dataInclusao.getMonth() + 1,
              day: mm.dataInclusao.getDate()

            }
          };
          this.IsNew = false;
        },
          error => {
            //this.alertService.error(['Ocorreu um erro ao chamar o serviço']);
          });
      } else {
        this.mailingLoteEnvios.usuarioIdAlteracao = user.user.usuarioId;
        this.mailingLoteEnvios.usuarioResponsavelCadastro = user.user.nome;
        this.emailsLoteEnvioService.edit(this.mailingLoteEnvios).toPromise().then(c => {
          this.mensagem = 'Registro atualizado com sucesso.';
          this.erro = false;
          this.success = true;
          this.loading = false;
        }).catch(x => {
          this.loading = false;
          this.mensagem = x.mensagem;
          this.erro = true;
          this.success = false;
        });
      }
    }
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


  Mascara() {
    this.commonService.MascaraData(document.getElementById('txtDataEnvioInicio'));
    this.commonService.MascaraData(document.getElementById('txtDataEnvioFim'));
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  adicionarDestinatario() {
    let destinatario: MailingLoteEnvioDestinatarios = new MailingLoteEnvioDestinatarios();
    destinatario.associadoId = this.idInsert;
    destinatario.mailingLoteEnvioId = this.mailingLoteEnvios.mailingLoteEnvioId;
    destinatario.statuId = 1;

    this.emailsLoteEnvioService.insertDestinatario(destinatario).toPromise()
    .then(c => {
      console.log(c);

      this.buscarDestinatarios();
    }).catch(x => {
      console.log(x)
    })
  }

  ConfirmarDelecao(id) {
    this.emailsLoteEnvioService.deleteDesti(id).toPromise()
    .then(c => this.buscarDestinatarios());
  }

  buscarDestinatarios() {
    this.mailingDestinatarios = [];

    this.emailsLoteEnvioService.getAllDestinatarios(this.mailingLoteEnvios.mailingLoteEnvioId)
    .then(c => {
      this.mailingDestinatarios = c;

      this.mailingDestinatarios.map(x => this.associadosService.getById(x.associadoId).toPromise().then(z => {
        x.nomeBeneficiario = z.nome;
      }));
    });
  }
}


export class Permissions {
  btnCadastrar: boolean;
}
