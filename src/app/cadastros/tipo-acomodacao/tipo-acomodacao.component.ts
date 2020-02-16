import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TipoAcomodacoes } from 'src/app/models/TipoAcomodacoes';
import { TipoAcomodacaoService } from 'src/app/services/tipo-acomodacao.service';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tipo-acomodacao',
  templateUrl: './tipo-acomodacao.component.html',
  styleUrls: ['./tipo-acomodacao.component.scss']
})
export class TipoAcomodacaoComponent implements OnInit {
  public loading = false;
  public listaAcomodacao: TipoAcomodacoes[] = [];
  public tipoAcomodacao: TipoAcomodacoes = new TipoAcomodacoes();
  permissions: Permissions = new Permissions();


  constructor(
    private tipoAcomodacaoServico: TipoAcomodacaoService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private authService: AuthenticationService,
    private commonService: CommonService

  ) { }

  required: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.tipoAcomodacao.ativo = true;
    this.tipoAcomodacao.descricao = '';

    this.authService.verificarPermissao('Grupos')
      .then(c => { this.permissions.btnCadastrar = c; this.loading = false; })
      .catch(this.handleError);

  }

  private handleError() {
    location.href = '/login';
  }

  Mascara() {
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  buscar() {
    this.loading = true;
    this.listaAcomodacao = [];
    this.tipoAcomodacaoServico.getAll(this.tipoAcomodacao.tipoAcomodacaoId,
      this.tipoAcomodacao.descricao,
      this.tipoAcomodacao.ativo).subscribe(c => {
        
        this.listaAcomodacao = c;
        this.loading = false;
        if (c.length > 0) {
          this.required = false;
        }
        else {
          this.required = true;
        }
      });
  }
}



export class Permissions {
  btnCadastrar: boolean;
}