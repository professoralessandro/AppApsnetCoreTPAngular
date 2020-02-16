import { Component, OnInit } from '@angular/core';
import { Visitantes } from 'src/app/models/Visitantes';
import { TiposPessoas } from 'src/app/models/TiposPessoas';
import { VisitantesService } from 'src/app/services/visitantes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { debug } from 'util';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-visitantes',
  templateUrl: './visitantes.component.html',
  styleUrls: ['./visitantes.component.scss']
})

export class VisitantesComponent implements OnInit
{
  //ATRIBUTOS
  date = new Date();

  //LOADING
  public loading = false;

  //LISTS
  public listaVisitantes: Visitantes[] = [];
  public listaTiposPessoas: TiposPessoas[] = [];

  //MODELO VISITANTES DA CLASSE
  public visitante: Visitantes = new Visitantes();
  public tiposPessoas: TiposPessoas = new TiposPessoas();

  public VisitanteId: number;
  public Nome: string;
  public CPF: string;
  public DataNascimento: Date;
  public Sexo: string;
  public Telefone: string;
  public Email: string;
  public Imagem: string;
  public Bloqueado: boolean;
  public Ativo: boolean;
  public TipoPessoaId: number;

  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
  };

  //PERMISSOES
  permissions: Permissions = new Permissions();

  constructor(
    private visitantesService: VisitantesService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private router: Router
  )
  { }//CONSTRUTOR

  required: boolean = false;

  ngOnInit()
  {
    //INICIALIZAR OS ATRIBUTOS
    this.visitante.nome = '';
    this.visitante.cpf = '';
    this.visitante.dataNascimento = new Date();
    this.visitante.sexo = '';
    this.visitante.telefone = '';
    this.visitante.email = '';
    this.visitante.imagem = '';
    this.visitante.bloqueado = false;
    this.visitante.ativo = true;

    this.Nome = this.visitante.nome;
    this.CPF = this.visitante.cpf;
    this.DataNascimento = this.visitante.dataNascimento;
    this.Sexo = this.visitante.sexo;
    this.Telefone = this.visitante.telefone;
    this.Email = this.visitante.email;
    this.Imagem = this.visitante.imagem;
    this.Bloqueado = this.visitante.bloqueado;
    this.Ativo = this.visitante.ativo;
    this.TipoPessoaId = this.visitante.tipoPessoaId;
    this.visitante.ativo = true;

    //VERIFICA SE O USUARIO ESTA LOGADO E TEM PERMISSAO PARA VER O BOTÃO CADASTRAR
    this.authService.verificarPermissao('Grupos').then(c => { 
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);
  }//INIT

  Mascara(){
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

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

  private handleError() {
    location.href = '/login';
  }//ERROR DE AUTH

  buscar()
  {
    this.loading = true;
    this.listaVisitantes = [];
    debugger;
    this.visitantesService.getAll(this.visitante.visitanteId, this.visitante.nome, this.visitante.cpf, this.visitante.ativo).subscribe(c => {
      this.loading = false;
      this.listaVisitantes = c;
      if(c.length > 0) {
        this.required = false;
      }
      else {
          this.required = true;
      }        
    });
  }//BUSCAR

}//CLASSE

export class Permissions {
  btnCadastrar: boolean;
}//CLASSE PERMISSIONS

export class AppComponent {
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
}

