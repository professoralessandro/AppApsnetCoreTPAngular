import { Component, OnInit } from '@angular/core';
import { TipoAcomodacoes } from 'src/app/models/TipoAcomodacoes';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { TipoAcomodacaoService } from 'src/app/services/tipo-acomodacao.service';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { CommonService } from 'src/app/services/common.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cadastro-tipo-acomodacao',
  templateUrl: './cadastro-tipo-acomodacao.component.html',
  styleUrls: ['./cadastro-tipo-acomodacao.component.scss']
})
export class CadastroTipoAcomodacaoComponent implements OnInit {
  public loading = false;
  permissions: Permissions = new Permissions();
  tipoAcomodacao: TipoAcomodacoes = new TipoAcomodacoes();
  isNew = true;

  constructor(
    private tipoAcomodacaoServico: TipoAcomodacaoService,
    private alertService: AlertService,
    private router: ActivatedRoute,
    private authService: AuthenticationService,
    private commonService: CommonService
  ) { }

  public required: boolean;
  public success: boolean;
  public erro: boolean;
  public mensagem: string;

  ngOnInit() {
    this.loading = true;
    this.tipoAcomodacao = new TipoAcomodacoes();
    this.tipoAcomodacao.ativo = true;
    this.tipoAcomodacao.descricao = '';
    this.tipoAcomodacao.descricaoGridPlural = '';
    this.tipoAcomodacao.descricaoGridSingular = '';

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.tipoAcomodacaoServico.getAll(Number(c.get('id')), '', '').subscribe(x => {
          this.tipoAcomodacao = x[0];
          this.loading = false;
          this.isNew = false;
        });
      }
      else {
        this.loading = false;
      }
    });
  }

  private handleError() {
    location.href = '/login';
  }

  Novo()
  {
    this.loading = true;
    this.success = false;
    this.erro = false;

    this.tipoAcomodacao.tipoAcomodacaoId = null;
    this.isNew = true;

    let txtDescricao: any = document.getElementById('txtDescricao');
    txtDescricao.value = '';
    this.loading = false;
  }

  cadastrarTipoAcomodacao() {
    this.loading = true;
    this.mensagem = '';

    if (this.Validar()) {
      if (this.isNew) {
        this.tipoAcomodacaoServico.insert(this.tipoAcomodacao).subscribe(c => {
          this.mensagem = `Registro inserido com sucesso.`;
          this.loading = false;
          this.isNew = false;
          this.success = true;

          this.tipoAcomodacao.tipoAcomodacaoId = c.tipoAcomodacaoId;
        });
      } else {
        this.tipoAcomodacaoServico.edit(this.tipoAcomodacao).subscribe(c => {
          this.mensagem = `Registro atualizado com sucesso.`;
          this.loading = false;
          this.success = true;

          this.tipoAcomodacao.tipoAcomodacaoId = c.tipoAcomodacaoId;
        });
      }
    }
    else
    {
      this.loading = false;
    }
  }

  Validar() {
    this.required = false;
    this.success = false;
    this.erro = false;

    let txtDescricao: any = document.getElementById('txtDescricao');

    if (txtDescricao.value.trim() == '') {
      this.required = true;
      if (isUndefined(this.mensagem)) {
        this.mensagem = '';
      }

      this.mensagem += `Informe uma descrição.\n`;
    }

    if (!this.required) {
      return true;
    }
    else {
      return false;
    }
  }
}
export class Permissions {
  btnCadastrar: boolean;
}
