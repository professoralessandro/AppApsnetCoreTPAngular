import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TiposPessoas } from 'src/app/models/TiposPessoas';
import { Visitantes } from 'src/app/models/Visitantes';
import { BloqueioFrequentadores } from 'src/app/models/BloqueioFrequentadores';
import { Frequentadores } from 'src/app/models/Frequentadores';
import { VisitantesService } from 'src/app/services/visitantes.service';
import { AssociadoService } from 'src/app/services/associados.service';
import { BloqueioFrequentadoresService } from 'src/app/services/bloqueioFrequentadores.service';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { API_URL } from 'src/environments/API_URL';
import { ActivatedRoute, Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';

@Component({
  selector: 'app-cadastro-bloqueio-frequentadores',
  templateUrl: './cadastro-bloqueio-frequentadores.component.html',
  styleUrls: ['./cadastro-bloqueio-frequentadores.component.sass']
})
export class CadastroBloqueioFrequentadoresComponent implements OnInit {
  //ATRIBUTOS
  date = new Date();

  //DATAS
  public dtInicio: any;
  public dtFim: any;
  public dtNascimento: any;

  //LOADING
  public loading = false;
  public isNew: boolean;
  public isVisitante: boolean;
  public isBloqueado: boolean;
  public isNewBloqueio: boolean;
  public success = false;
  public error = false;
  public mensagem: string;

  public id: number;

  public required: boolean = false;

  //TESTE
  public confirmacao: boolean;

  public imagePath;

  imgURL: any;

  bloqueioAcesso: boolean;

  public permiteCadastro = false;

  //LISTS
  public listaVisitantes: Visitantes[] = [];
  public listaTiposPessoas: TiposPessoas[] = [];

  //MODELO VISITANTES DA CLASSE
  public visitante: Visitantes = new Visitantes();
  public tiposPessoas: TiposPessoas = new TiposPessoas();
  public bloqueioFrequentadores = new BloqueioFrequentadores();
  public frequentadores = new Frequentadores();

  public tipoPessoa: string;
  public busca = false;
  //PERMISSOES
  permissions: Permissions = new Permissions();

  //MY OPTIONS
  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
  };

  constructor(
    private visitantesService: VisitantesService,
    private bloqueioFrequentadoresService: BloqueioFrequentadoresService,
    private associadoService: AssociadoService,
    private alertService: AlertService,
    private router: ActivatedRoute,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private http: HttpClient,
  ) { }//CONSTRUTOR

  ngOnInit() {
    this.bloqueioAcesso = false;

    this.loading = true;

    this.dtInicio = new Date();
    this.dtFim = new Date();

    //FREQUENTADORES
    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      debugger;
      if (c.get('isVisitante') === 'Convidado') {
        this.isVisitante = true;
      }
      else {
        this.isVisitante = false;
      }

      if (c.get('isBloqueado') === 'Bloqueado') {
        this.isBloqueado = true;
      }
      else {
        this.isBloqueado = false;
      }

      this.id = Number(c.get('id'));

    });

    this.router.paramMap.subscribe(c => {

      this.bloqueioFrequentadores.ativo = true;

      //CRIA VISITANTE OU TITULAR
      if (c.get('id') != null) {
        //SERVIÇO DE VISITANTES
        this.visitantesService.getAll(Number(c.get('id')), null, null).toPromise().then(x => {

          if (x.length > 0) {
            this.visitante = x[0];

            this.frequentadores.frequentadorId = x[0].visitanteId;
            this.frequentadores.cpf = x[0].cpf;
            this.frequentadores.nome = x[0].nome;
            debugger;
            this.frequentadores.tipoPessoa = x[0].tipoPessoaId.toString();
            this.frequentadores.tipoPessoaId = x[0].tipoPessoaId.toString();

            if (this.frequentadores.tipoPessoaId === '1') {
              this.frequentadores.tipoPessoa = 'Beneficiário Titular';
            }
            else if (this.frequentadores.tipoPessoaId === '2') {
              this.frequentadores.tipoPessoa = 'Dependente';
            }
            else if (this.frequentadores.tipoPessoaId === '3') {
              this.frequentadores.tipoPessoa = 'Convidado';
            }
          }

          this.busca = false;
          this.loading = false;
          this.isNew = false;


        }).then(c => {
          if (this.isBloqueado == true && this.isVisitante == true) {
            this.bloqueioFrequentadoresService.getAll(null, this.id).
              toPromise().
              then(c => {
                this.bloqueioFrequentadores = c[0];

                this.dtInicio = c[0].dataInicio;
                this.dtFim = c[0].dataFim;

                let dtFim: Date = new Date(c[0].dataFim);
                if (c[0].dataFim !== null) {
                  this.dtFim = {
                    date: {
                      year: dtFim.getFullYear(),
                      month: dtFim.getMonth() + 1,
                      day: dtFim.getDate()
                    }
                  };
                }

                let dtInicio: Date = new Date(c[0].dataInicio);
                if (c[0].dataInicio !== null) {
                  this.dtInicio = {
                    date: {
                      year: dtInicio.getFullYear(),
                      month: dtInicio.getMonth() + 1,
                      day: dtInicio.getDate()
                    }
                  };
                }

                debugger;
              });
          }
        });

        if (this.isVisitante == true) {
          
        }
        else if (this.isVisitante == false) {
          if (this.frequentadores != undefined) {
            debugger;
            this.associadoService.getAllWithParameter(Number(c.get('id'))).toPromise().then(c => {
              this.frequentadores.frequentadorId = c[0].associadoId;
              this.frequentadores.cpf = c[0].cpf;
              this.frequentadores.nome = c[0].nome;
              this.frequentadores.tipoPessoa = c[0].tipoPessoa;
              this.frequentadores.tipoPessoaId = c[0].tipoPessoa;

              debugger;

              if (c[0].tipoPessoa === '1') {
                this.frequentadores.tipoPessoa = 'Beneficiário Titular';
              }
              else if (c[0].tipoPessoa === '2') {
                this.frequentadores.tipoPessoa = 'Dependente';
              }
              else if (c[0].tipoPessoa === '3') {
                this.frequentadores.tipoPessoa = 'Convidado';
              }
            }).then(x => {
              if (this.isBloqueado == true && this.isVisitante == false) {
                this.bloqueioFrequentadoresService.getAll(null, this.id).
                  toPromise().
                  then(c => {
                    
                    this.bloqueioFrequentadores = c[0];

                    this.dtInicio = c[0].dataInicio;
                    this.dtFim = c[0].dataFim;

                    let dtFim: Date = new Date(c[0].dataFim);
                    if (c[0].dataFim !== null) {
                      this.dtFim = {
                        date: {
                          year: dtFim.getFullYear(),
                          month: dtFim.getMonth() + 1,
                          day: dtFim.getDate()
                        }
                      };
                    }

                    let dtInicio: Date = new Date(c[0].dataInicio);
                    if (c[0].dataInicio !== null) {
                      this.dtInicio = {
                        date: {
                          year: dtInicio.getFullYear(),
                          month: dtInicio.getMonth() + 1,
                          day: dtInicio.getDate()
                        }
                      };
                    }

                    debugger;
                  });
              }
            })
              .catch(e => {
                this.busca = true;
                this.isNew = false;
                this.loading = false;
              });
          }
        }
        else if (this.isVisitante == true && this.isBloqueado == true) {
          if (this.frequentadores != undefined) {
            debugger;
            this.visitantesService.getAll(Number(c.get('id'))).toPromise().then(c => {
              this.frequentadores.frequentadorId = c[0].visitanteId;
              this.frequentadores.cpf = c[0].cpf;
              this.frequentadores.nome = c[0].nome;
              this.frequentadores.tipoPessoa = c[0].tipoPessoaId.toString();
              this.frequentadores.tipoPessoaId = c[0].tipoPessoaId.toString();

              debugger;

              if (c[0].tipoPessoaId === 1) {
                this.frequentadores.tipoPessoa = 'Beneficiário Titular';
              }
              else if (c[0].tipoPessoaId === 2) {
                this.frequentadores.tipoPessoa = 'Dependente';
              }
              else if (c[0].tipoPessoaId === 3) {
                this.frequentadores.tipoPessoa = 'Convidado';
              }
            }).then(x => {
              if (this.isBloqueado == true && this.isVisitante == true) {
                this.bloqueioFrequentadoresService.getAll(null, this.id).
                  toPromise().
                  then(c => {
                    
                    this.bloqueioFrequentadores = c[0];

                    this.dtInicio = c[0].dataInicio;
                    this.dtFim = c[0].dataFim;

                    let dtFim: Date = new Date(c[0].dataFim);
                    if (c[0].dataFim !== null) {
                      this.dtFim = {
                        date: {
                          year: dtFim.getFullYear(),
                          month: dtFim.getMonth() + 1,
                          day: dtFim.getDate()
                        }
                      };
                    }

                    let dtInicio: Date = new Date(c[0].dataInicio);
                    if (c[0].dataInicio !== null) {
                      this.dtInicio = {
                        date: {
                          year: dtInicio.getFullYear(),
                          month: dtInicio.getMonth() + 1,
                          day: dtInicio.getDate()
                        }
                      };
                    }

                    debugger;
                  });
              }
            })
              .catch(e => {
                this.busca = true;
                this.isNew = false;
                this.loading = false;
              });
          }
        }
        //SERVIÇO DE BLOQUEIO DE FREQUENTADORES
      }
    });
  }//ONINIT

  cadastrarBloqueio() {
    debugger;
    if (this.validator()) {
      this.bloqueioFrequentadores.nome = this.frequentadores.nome;
      this.bloqueioFrequentadores.cpf = this.frequentadores.cpf;
      this.bloqueioFrequentadores.frequentadorId = this.frequentadores.frequentadorId;
      this.bloqueioFrequentadores.usuarioId = 1; //MUDAR PARA O USUARIO DA SESSAO QUE BLOQUEOU
      this.bloqueioFrequentadores.tipoPessoaId = Number(this.frequentadores.tipoPessoaId);

      if(this.isBloqueado == false)
      {
        this.bloqueioFrequentadoresService.insert(this.bloqueioFrequentadores).toPromise().then(c => {
          this.success = true;
          this.error = false;
          this.mensagem = 'O bloqueio foi inserido com sucesso.';
        }).catch(e => {
          this.success = false;
          this.error = true;
          this.mensagem = 'Houve um erro ao tentar inserir o registro.';
        });
      }
      else
      {
        this.bloqueioFrequentadoresService.edit(this.bloqueioFrequentadores).toPromise().then(c => {
          this.success = true;
          this.error = false;
          this.mensagem = 'O bloqueio foi alterado com sucesso.';
        }).catch(e => {
          this.success = false;
          this.error = true;
          this.mensagem = 'Houve um erro ao tentar inserir o registro.';
        });
      }
    }
  }//CADASTRAR BLOQUEIO

  private handleError() {
    location.href = '/login';
  }//HAND

  validator() {
    if (this.bloqueioFrequentadores.dataInicio > this.bloqueioFrequentadores.dataFim) {
      this.success = false;
      this.error = true;
      this, this.mensagem = 'A data de início não pode ser maior que a data final.';
      return false;
    }

    if (this.bloqueioFrequentadores.descricao === undefined) {
      this.success = false;
      this.error = true;
      this, this.mensagem = 'A justificativa é um campo obrigatório.';
      return false;
    }

    if (this.bloqueioFrequentadores.dataInicio === undefined) {
      this.success = false;
      this.error = true;
      this, this.mensagem = 'A data de início é um campo obrigatória.';
      return false;
    }

    if (this.bloqueioFrequentadores.dataFim === undefined) {
      this.success = false;
      this.error = true;
      this, this.mensagem = 'A data de final é um campo obrigatória.';
      return false;
    }

    return true;
  }//VALIDATOR

}//CLASS
export class Permissions {
  btnCadastrar: boolean;
}//CLASSE PERMISSIONS
