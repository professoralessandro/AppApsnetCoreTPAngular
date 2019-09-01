import { Component, OnInit } from '@angular/core';
import { BloqueioFrequentadores } from 'src/app/models/BloqueioFrequentadores';
import { TiposPessoas } from 'src/app/models/TiposPessoas';
import { BloqueioFrequentadoresService } from 'src/app/services/bloqueioFrequentadores.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { INgxMyDpOptions, IMyDateModel } from 'ngx-mydatepicker';
import { debug } from 'util';

//PAGINÇÃO

import { NgxPaginationModule } from 'ngx-pagination'; // Módulo da dependência de paginação

@Component({
  selector: 'app-bloqueio-frequentadores',
  templateUrl: './bloqueio-frequentadores.component.html',
  styleUrls: ['./bloqueio-frequentadores.component.sass']
})
export class BloqueioFrequentadoresComponent implements OnInit {

  //ATRIBUTOS
  date = new Date();
  ativo : string;
  tipoPessoaId : string;

  //LOADING
  public loading = false;

  //LISTS
  public listaBloqueioFrequentadores: BloqueioFrequentadores[] = [];
  public listaTiposPessoas: TiposPessoas[] = [];

  //MODELO VISITANTES DA CLASSE
  public bloqueioFrequentadores: BloqueioFrequentadores = new BloqueioFrequentadores();
  public tiposPessoas: TiposPessoas = new TiposPessoas();

  //VERIFICADORES
  required: boolean = false;
  public error = false;
  public sucess = false;

  //MYDATEPICKER
  myOptions: INgxMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    sunHighlight: true,
  };

  //PERMISSOES
  permissions: Permissions = new Permissions();

  constructor(
    private bloqueioFrequentadoresService: BloqueioFrequentadoresService,
    private authService: AuthenticationService,
    private commonService: CommonService,
    private router: Router
  ){}//CONSTRUTOR

  ngOnInit()
  {
    this.loading = true;
    this.bloqueioFrequentadores = new BloqueioFrequentadores();

    this.tipoPessoaId = "1";
    this.ativo = 'true';

    this.authService.verificarPermissao('Grupos').then(c => { 
      this.permissions.btnCadastrar = c;
      this.loading = false;
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

  buscar()
  {
    this.loading = true;
    debugger;
    this.bloqueioFrequentadores.tipoPessoaId = Number(this.tipoPessoaId);

    if(this.ativo == "false")
    {
      this.bloqueioFrequentadores.ativo = false;
    }
    else if(this.ativo == "true")
    {
      this.bloqueioFrequentadores.ativo = true;
    }
    else
    {
      this.bloqueioFrequentadores.ativo = undefined;
    }

    if(this.tipoPessoaId === '')
    {
      this.bloqueioFrequentadores.tipoPessoaId = null;
    }

    this.listaBloqueioFrequentadores = [];

    this.bloqueioFrequentadoresService.getAllWithParameter(this.bloqueioFrequentadores.bloqueioFrequentadorId, this.bloqueioFrequentadores.tipoPessoaId, this.bloqueioFrequentadores.nome,this.bloqueioFrequentadores.cpf, this.bloqueioFrequentadores.ativo).subscribe(c => {
      this.loading = false;
      this.listaBloqueioFrequentadores = c;
      if(c.length > 0) {
        this.required = false;
      }
      else {
          this.required = true;
      }        
    });
  }//BUSCAR

}//CLASS

export class Permissions {
  btnCadastrar: boolean;
}//CLASSE PERMISSIONS

export class AppComponent {
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.
}
