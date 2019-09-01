import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TiposPessoas } from 'src/app/models/TiposPessoas';
import { Visitantes } from 'src/app/models/Visitantes';
import { BloqueioFrequentadores } from 'src/app/models/BloqueioFrequentadores';
import { VisitantesService } from 'src/app/services/visitantes.service';
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
  selector: 'app-cadastro-visitantes',
  templateUrl: './cadastro-visitantes.component.html',
  styleUrls: ['./cadastro-visitantes.component.scss']
})

export class CadastroVisitantesComponent implements OnInit {

  //ATRIBUTOS
  date = new Date();
  public dataEnvioFim: string = '';

  public formularioPrincipal: boolean = true;

  //DATAS
  public dtInicio: any;
  public dtFim: any;
  public dtNascimento: any;

  //LOADING
  public loading = false;
  public isNew: boolean;
  public isNewBloqueio: boolean;
  public success = false;
  public error = false;
  public mensagem: string;

  public dataIn: any;

  message = '';

  public required: boolean = false;

  boxBloqueio: boolean;

  public confirmacao: boolean;

  public imagePath;

  imgURL: any; 1

  bloqueioAcesso: boolean;

  public permiteCadastro = false;

  //LISTS
  public listaVisitantes: Visitantes[] = [];
  public listaTiposPessoas: TiposPessoas[] = [];

  //MODELO VISITANTES DA CLASSE
  public visitante: Visitantes = new Visitantes();
  public tiposPessoas: TiposPessoas = new TiposPessoas();
  public bloqueioFrequentadores = new BloqueioFrequentadores();

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
    private alertService: AlertService,
    private router: ActivatedRoute,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private http: HttpClient,
  ) { }//CONTRUTOR

  ngOnInit() {

    this.bloqueioAcesso = false;

    this.loading = true;

    //ATRIBUTOS DA CLASSE
    //this.dtInicio = '';
    //this.dtFim = '';
    //this.dtNascimento = '';

    //VISITANTES
    this.visitante.nome = '';
    this.visitante.cpf = '';
    this.visitante.dataNascimento = new Date();
    this.visitante.sexo = '';
    this.visitante.telefone = '';
    this.visitante.email = '';
    this.visitante.imagem = '';
    this.visitante.bloqueado = false;
    this.visitante.ativo = true;
    this.visitante.tipoPessoaId = 3;

    this.dtInicio = new Date();
    this.dtFim = new Date();

    //FREQUENTADORES
    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        //SERVIÇO DE VISITANTES
        this.visitantesService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          if(x.length > 0)
          {
            this.isNew = false;
            this.visitante = x[0];

            let dtNascimento: Date = new Date(x[0].dataNascimento);
  
            if (x[0].dataNascimento !== null) {
              this.dtNascimento = {
                date: {
                  year: dtNascimento.getFullYear(),
                  month: dtNascimento.getMonth() + 1,
                  day: dtNascimento.getDate()
                }
              };
            }
          }
          else
          {
            this.visitante = new Visitantes();
            this.isNew = true;
          }
          

          this.loading = false;
          this.isNew = false;
        });
        //SERVIÇO DE BLOQUEIO DE FREQUENTADORES

        this.router.paramMap.subscribe(c => {
          if (c.get('id') != null) {
            debugger;
            this.bloqueioFrequentadoresService.getAll(null, Number(c.get('id'))).subscribe(z => {

              debugger;

              if (z.length > 0) {
                this.bloqueioFrequentadores = z[0];

                this.isNewBloqueio = false;

                if (z[0].dataFim < this.date || z[0].dataFim == null) {
                  this.bloqueioAcesso = true;
                }

                //DATA DE INICIO
                let dtInicio: Date = new Date(z[0].dataInicio);
                if (z[0].dataInicio !== null) {
                  this.dtInicio = {
                    date: {
                      year: dtInicio.getFullYear(),
                      month: dtInicio.getMonth() + 1,
                      day: dtInicio.getDate()
                    }
                  };
                }

                //DATA DE FINAL
                let dtFim: Date = new Date(z[0].dataFim);
                if (z[0].dataFim !== null) {
                  this.dtFim = {
                    date: {
                      year: dtFim.getFullYear(),
                      month: dtFim.getMonth() + 1,
                      day: dtFim.getDate()
                    }
                  };
                }
              }
              else {

                this.isNewBloqueio = true;

                this.bloqueioAcesso = false;

                this.bloqueioFrequentadores = new BloqueioFrequentadores();

                this.bloqueioFrequentadores.frequentadorId = this.visitante.visitanteId;
                this.bloqueioFrequentadores.ativo = false;
                this.bloqueioFrequentadores.cpf = this.visitante.cpf;

                this.bloqueioFrequentadores.dataCadastro = new Date();

                this.bloqueioFrequentadores.descricao = '';
                this.bloqueioFrequentadores.nome = this.visitante.nome;
                this.bloqueioFrequentadores.tipoPessoaId = 3;
              }
            });
          }
          else {
            this.bloqueioAcesso = false;
          }
        });
      }
      else {
        this.loading = false;
        this.isNew = true;
      }

    });

  }//ONINIT

  public permitirCadastro() {
    if (this.visitante.nome !== '' && this.visitante.sexo !== '' && this.visitante.dataNascimento !== this.date) {
      this.permiteCadastro = true;
    }
  }

  private handleError() {
    location.href = '/login';
  }//HAND

  validarVisitante() {
    debugger;
    if (this.visitante.sexo == "") {
      this.mensagem = `sexo é obrigatorio!\n`;
      return true;
    }
    if (this.visitante.dataNascimento == null) {
      this.mensagem = `Data de nascimento é obrigatório!\n`;
      return true;
    }
    if (this.date > this.dtNascimento) {
      this.mensagem = `Data inválida!\n`;
      return true;
    }
    if (this.visitante.nome == '') {
      this.mensagem = `Nome é obrigatório!\n`;
      return true;
    }
    return false;
  }//VALIDAR

  validarBloqueio() {
    this.mensagem = '';
    if (this.bloqueioFrequentadores.dataInicio == null) {
      this.mensagem = `Data inválido!\n`;
      return true;
    }
    if (this.bloqueioFrequentadores.descricao == '') {
      this.mensagem = `Descrição é obrigatório!\n`;
      return true;
    }
    return false;
  }//VALIDAR BLOQUEIO

  Mascara() {
    //this.commonService.MascaraData(document.getElementById('txtDataNascimento'));
  }//MASCARA

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
  }


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

  public novo() {
    this.visitante.nome = '';
    this.visitante.cpf = '';
    this.visitante.dataNascimento = new Date();
    this.visitante.sexo = '';
    this.visitante.telefone = '';
    this.visitante.email = '';
    this.visitante.imagem = '';
    this.visitante.bloqueado = false;
    this.visitante.ativo = true;
    this.visitante.tipoPessoaId = 3;
  }

  OpenFile = function () {
    var t = document.getElementById('fileAvatar');
    t.click();
  }

  cadastrarVisitante() {
    this.mensagem = "";
    this.success = false;
    this.error = false;
    debugger;
    if (this.validarVisitante()) {
      this.error = true;
      this.success = false;
    }

    if (this.error == false) {
      if (this.isNew) {
        this.visitante.tipoPessoaId = 3;
        this.visitantesService.insert(this.visitante).subscribe(c => {
          this.mensagem = '';
          this.success = true;
          this.error = false;
          this.mensagem = 'Registro inserido com sucesso.';
        });
      } else {
        this.visitantesService.edit(this.visitante).subscribe(c => {
          this.mensagem = '';
          this.success = true;
          this.error = false;
          this.mensagem = 'Registro atualizado com sucesso.';
        });
      }
    }
  }

  cadastrarBloqueioFrequentadores() {
    this.mensagem = "";
    this.loading = true;
    this.success = false;
    this.error = false;

    debugger;
    if (this.validarBloqueio()) {
      this.error = true;
      this.success = false;
    }

    //this.dtFim.toString();

    if (this.error == false) {
      this.bloqueioFrequentadores.tipoPessoaId = 3;
      this.bloqueioFrequentadores.usuarioId = 1;

      debugger;

      if (this.bloqueioFrequentadores.bloqueioFrequentadorId == null) {
        this.bloqueioFrequentadoresService.insert(this.bloqueioFrequentadores).subscribe(c => {
          this.mensagem = '';
          this.success = true;
          this.error = false;
          this.mensagem = 'Bloqueio salvo com sucesso!';
          this.loading = false;
          this.isNewBloqueio = false;
        });
      }
      else {
        this.bloqueioFrequentadoresService.edit(this.bloqueioFrequentadores).subscribe(c => {
          debugger;
          this.mensagem = '';
          this.success = true;
          this.error = false;
          this.mensagem = 'Alteração salva com sucesso!\n';
          if (this.bloqueioFrequentadores.ativo == false) {
            this.mensagem += 'Visitante desbloqueado!\n';
          }
          this.loading = false;
          this.isNewBloqueio = false;
        });
      }
    }
  }

  desbloquearBloqueioFrequentadores() {
    this.loading = true;
    this.success = false;
    this.message = "";

    //this.dtFim.toString();

    this.bloqueioFrequentadores.tipoPessoaId = 3;
    this.bloqueioFrequentadores.usuarioId = 1;

    this.bloqueioFrequentadoresService.edit(this.bloqueioFrequentadores).subscribe(c => {
      this.mensagem = '';
      this.success = true;
      this.error = false;
      this.mensagem = 'Frequentador desbloqueado com sucesso.';
      this.loading = false;
    });
  }

  bloquearAcesso() {
    this.boxBloqueio = true;

    this.formularioPrincipal = false;
    //this.confirmacao = true;

    this.required = false;
    this.success = false;
    this.error = false;
  }//BLOQUEIO ACESSO

  desbloquearAcesso() {
    this.boxBloqueio = false;
    this.formularioPrincipal = true;
    //this.confirmacao = false;
    this.required = false;
    this.success = false;
    this.error = false;
  }//NAO BLOQUEAR

}//CLASSE

export class Permissions {
  btnCadastrar: boolean;
}//CLASSE PERMISSIONS