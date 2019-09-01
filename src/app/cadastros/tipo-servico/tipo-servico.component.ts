import { Component, OnInit } from '@angular/core';
import { TipoServico } from 'src/app/models/TipoServico';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tipo-servico',
  templateUrl: './tipo-servico.component.html',
  styleUrls: ['./tipo-servico.component.scss']
})
export class TipoServicoComponent implements OnInit
{
  public loading = false;
  public listaServico: TipoServico[] = [];
  public tipoServico: TipoServico = new TipoServico();
  permissions: Permissions = new Permissions();

  constructor(
    private tipoServicoServ: TipoServicoService,
    private authService: AuthenticationService,
    private commonService: CommonService) { }

  required: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.tipoServico.descricao = '';
    this.tipoServico.ativo = true;

    this.authService.verificarPermissao('Grupos')
    .then(c => { this.permissions.btnCadastrar = c; this.loading = false; })
    .catch(this.handleError);;
  }

  private handleError() {
    location.href = '/login';
  }

  Mascara(){
    this.commonService.SomenteNumeros(document.getElementById('txtCodigo'));
  }

  buscar()
  {
    this.loading ; true;
    this.listaServico = [];
    this.tipoServicoServ.getAll(this.tipoServico.tipoServicoId,
                                this.tipoServico.descricao,
                                this.tipoServico.ativo).subscribe(c => {
    this.listaServico = c;
    if(c.length > 0) {
      this.required = false;
      }
      else
      {
        this.required = true;
      }  
    });
  }
}

export class Permissions {
  btnCadastrar: boolean;
}