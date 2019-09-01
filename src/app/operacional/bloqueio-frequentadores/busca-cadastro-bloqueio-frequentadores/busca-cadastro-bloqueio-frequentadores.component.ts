import { Component, OnInit } from '@angular/core';
import { BloqueioFrequentadores } from 'src/app/models/BloqueioFrequentadores';
import { TiposPessoas } from 'src/app/models/TiposPessoas';
import { Visitantes } from 'src/app/models/Visitantes';
import { BloqueioFrequentadoresService } from 'src/app/services/bloqueioFrequentadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { debug } from 'util';
import { Frequentadores } from '@app/models/Frequentadores';
import { Associado, AssociadoPG } from '@app/models/Associado';
import { AssociadoService } from '@app/services/associados.service';
import { VisitantesService } from '@app/services/visitantes.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-busca-cadastro-bloqueio-frequentadores',
  templateUrl: './busca-cadastro-bloqueio-frequentadores.component.html',
  styleUrls: ['./busca-cadastro-bloqueio-frequentadores.component.scss']
})
export class BuscaCadastroBloqueioFrequentadoresComponent implements OnInit {

  //ATRIBUTOS
  public ativo: string;
  public tipoPessoaId: string;

  //LOADING
  public loading = false;

  //LISTS
  public listaBloqueioFrequentadores: BloqueioFrequentadores[] = [];
  public listaTiposPessoas: TiposPessoas[] = [];
  public listaAssociados: Associado[] = [];
  public listaFrequentadores: Frequentadores[] = [];

  //MODELO VISITANTES DA CLASSE
  public associado: Associado = new Associado();
  public bloqueioFrequentadores: BloqueioFrequentadores = new BloqueioFrequentadores();
  public tiposPessoas: TiposPessoas = new TiposPessoas();
  public frequentadores: Frequentadores = new Frequentadores();
  public visitantes: Visitantes = new Visitantes();

  //VERIFICADORES
  public required: boolean = false;
  public error = false;
  public sucess = false;
  public mensagem = '';

  public busca = false;

  //PERMISSOES
  permissions: Permissions = new Permissions();


  constructor(
    private bloqueioFrequentadoresService: BloqueioFrequentadoresService,
    private associadoService: AssociadoService,
    private visitantesService: VisitantesService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private router: Router
  ) { }//CONSTRUTOR

  ngOnInit() {
    //this.loading = true;
    this.bloqueioFrequentadores = new BloqueioFrequentadores();
    this.tipoPessoaId = '1';

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);


  }//ONINIT

  private handleError() {
    location.href = '/login';
  }//ERROR DE AUTH

  public cpfcnpjmask = function () {
    var numbers = this.usuarioBuscar.login.match(/\d/g);
    var numberLength = 0;
    if (numbers) {
      numberLength = numbers.join('').length;
    }
    if (numberLength <= 11) {
      return [/[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    } else {
      return [/[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '.', /[0-9]/, /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/];
    }
  }//MASKCPF

  buscar() {

    this.loading = true;

    let i = 0;

    this.listaBloqueioFrequentadores = [];
    this.listaFrequentadores = [];

    if (this.associado.nome !== null || this.tipoPessoaId !== null) {
      this.listaFrequentadores = [];
      this.listaBloqueioFrequentadores = [];

      this.bloqueioFrequentadoresService.getAll().toPromise().then(a => {
        this.listaBloqueioFrequentadores = a;
      });

      if (this.tipoPessoaId === '1' || this.tipoPessoaId === '2') {
        //INICIO DO BLOQUEIO ASSOCIADO
        this.associadoService.getAllWithParameter(null, this.associado.nome, null, null, true, this.tipoPessoaId).toPromise().then(c => {
          i = 0;
          c.forEach(z => {
            //this.associado = z[i];

            this.frequentadores = new Frequentadores();

            this.frequentadores.frequentadorId = z.associadoId;
            this.frequentadores.cpf = z.cpf;
            this.frequentadores.nome = z.nome;
            this.frequentadores.tipoPessoaId = z.tipoPessoa;

            if (this.frequentadores.tipoPessoaId === '1') {
              this.frequentadores.tipoPessoa = 'Beneficiário Titular';
            }
            else if (this.frequentadores.tipoPessoaId === '2') {
              this.frequentadores.tipoPessoa = 'Dependente';
            }
            else if (this.frequentadores.tipoPessoaId === '3') {
              this.frequentadores.tipoPessoa = 'Convidado';
            }

            this.listaFrequentadores.push(this.frequentadores);

            i++;
          });//FOREACH

          if (c.length == 0) {
            this.error = true;
            this.sucess = false;
            this.mensagem = "Não há registros para o critério de busca informado!";
          }
          else {
            this.error = false;;
            this.sucess = true;
            this.mensagem = "!";
          }

        }).catch(e => {

          this.error = true;
          this.sucess = false;
          this.mensagem = "Não há registros para o critério de busca informado!";
        }).then(t => {
          this.listaBloqueioFrequentadores.forEach(l => {
            if (l.tipoPessoaId == 1 || l.tipoPessoaId == 2) {
              this.listaFrequentadores.forEach(k => {
                if (k.frequentadorId == l.frequentadorId && l.ativo == true) {
                  k.bloqueio = 'Bloqueado';
                  k.bloqueado = true;
                }
                else if (k.frequentadorId !== l.usuarioId && k.bloqueio !== 'Bloqueado') {
                  k.bloqueio = 'Desbloqueado';
                  k.bloqueado = false;
                }
              });
            }
          })
        }).then(a => { this.loading = false; });
      }
      else if (this.tipoPessoaId === '3') {
        this.visitantesService.getAll(null, this.associado.nome, null, true, this.tipoPessoaId).toPromise().then(c => {
          i = 0;
          if (c.length > 0) {
            c.forEach(z => {

              this.frequentadores = new Frequentadores();

              //this.visitantes = z[i];

              this.frequentadores.frequentadorId = z.visitanteId;
              this.frequentadores.cpf = z.cpf;
              this.frequentadores.nome = z.nome;
              this.frequentadores.bloqueado = z.bloqueado;
              //this.frequentadores.bloqueio = z.bloqueado == true ? 'Bloqueado' : 'Desbloqueado';
              this.frequentadores.tipoPessoaId = z.tipoPessoaId.toString();

              if (this.frequentadores.tipoPessoaId === '1') {
                this.frequentadores.tipoPessoa = 'Beneficiário Titular';
              }
              else if (this.frequentadores.tipoPessoaId === '2') {
                this.frequentadores.tipoPessoa = 'Dependente';
              }
              else if (this.frequentadores.tipoPessoaId === '3') {
                this.frequentadores.tipoPessoa = 'Convidado';
              }

              this.listaFrequentadores.push(this.frequentadores);

            });//FOREACH
          }
          else {
            this.error = true;
            this.sucess = false;
            this.mensagem = "Não há registros para o critério de busca informado!";
          }
        }).catch(e => {
          this.error = true;
          this.sucess = false;
          this.mensagem = "Não há registros para o critério de busca informado!";
        })
        .then(t => {
          debugger;
          this.listaBloqueioFrequentadores.forEach(l => {
            if (l.tipoPessoaId == 3) {
              this.listaFrequentadores.forEach(k => {
                if (k.frequentadorId == l.frequentadorId && l.ativo == true) {
                  k.bloqueio = 'Bloqueado';
                  k.bloqueado = true;
                }
                else if (k.frequentadorId !== l.usuarioId && k.bloqueio !== 'Bloqueado') {
                  k.bloqueio = 'Desbloqueado';
                  k.bloqueado = false;
                }
              });
            }
          })
        }).then(a => { this.loading = false; });//SUBSCRIBE
      }
    }//IF
  }

}//CLASS

export class Permissions {
  btnCadastrar: boolean;
}//CLASSE PERMISSIONS

export class AppComponent {
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
}
