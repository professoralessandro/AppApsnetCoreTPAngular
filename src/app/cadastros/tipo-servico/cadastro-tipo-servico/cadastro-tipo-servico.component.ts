import { Component, OnInit } from '@angular/core';
import { TipoServico } from 'src/app/models/TipoServico';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute } from '@angular/router';
import { isUndefined } from 'util';
import { CommonService } from 'src/app/services/common.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cadastro-tipo-servico',
  templateUrl: './cadastro-tipo-servico.component.html',
  styleUrls: ['./cadastro-tipo-servico.component.scss']
})
export class CadastroTipoServicoComponent implements OnInit {
  permissions: Permissions = new Permissions();
  public loading = false;
  tipoServico: TipoServico = new TipoServico();
  isNew = true;

  constructor(
    private tipoServicoServ: TipoServicoService,
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
    this.tipoServico.descricao = '';
    this.tipoServico.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.tipoServicoServ.getAll(Number(c.get('id')), '', '').subscribe(x => {
          this.loading = false;
          this.tipoServico = x[0];
          this.isNew = false;
        });
      }
      else
      {
        this.loading = false;
      }
    });
  }

  private handleError() {
    location.href = '/login';
  }
  
  Novo(){
    this.loading = true;
    this.required = false;
    this.success = false;
    this.erro = false;

    this.tipoServico.tipoServicoId = null;
    this.isNew = true;

    let txtDescricao: any = document.getElementById('txtDescricao');
    txtDescricao.value = '';
    this.loading = false;
  }

  cadastrarTipoServico()
  {
    this.loading = true;
    this.mensagem = '';

    if(this.Validar()){
      if (this.isNew) {
        this.tipoServicoServ.insert(this.tipoServico).subscribe(c => {
          this.mensagem = `Registro inserido com sucesso.`;
          this.loading = false;
          this.isNew = false;
          this.success = true;

          this.tipoServico.tipoServicoId = c.tipoServicoId;
        });
      } else {
        this.tipoServicoServ.edit(this.tipoServico).subscribe(c => {
          this.mensagem = `Registro atualizado com sucesso.`;
          this.success = true;
          this.loading = false;
          this.tipoServico.tipoServicoId = c.tipoServicoId;
        });
      }
    }
    else
    {
      this.loading = false;;
    }
  }

  Validar()
  {
    this.required = false;
    this.success = false;
    this.erro = false;

    let txtDescricao: any = document.getElementById('txtDescricao');

    if(txtDescricao.value.trim() == '')
    {
      this.required = true;
      if(isUndefined(this.mensagem))
      {
        this.mensagem = '';
      }

      this.mensagem += `Informe uma descrição.\n`;
    }

    if(!this.required){
      return true;
    }
    else{
      return false;
    }  
  }
}
export class Permissions {
  btnCadastrar: boolean;
}
