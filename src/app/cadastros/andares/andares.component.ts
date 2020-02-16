import { Component, OnInit } from '@angular/core';
import { Andares } from 'src/app/models/Andares';
import { AndarService } from 'src/app/services/andar.service';
import { BlocoService } from 'src/app/services/bloco.service';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Blocos } from 'src/app/models/Blocos';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-andares',
  templateUrl: './andares.component.html',
  styleUrls: ['./andares.component.scss']
})


export class AndaresComponent implements OnInit {
  public loading = false;
  public andares: Andares = new Andares();
  public listaAndares: Andares[] = [];
  public bloco: Blocos = new Blocos();
  public listaBlocos: Blocos[] = [];
  public listaBlocosAll: Blocos[] = [];
  public sedes: Sedes[] = [];
  permissions: Permissions = new Permissions();
  public bindTable: BindTable[] = [];
  error = false;
  mensagem = "";


  constructor(
    private andarServico: AndarService,
    private sedeServico: SedeService,
    private blocoServico: BlocoService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.andares.ativo = true;
    this.andares.descricao = '';
    this.error = false;
    this.mensagem = "";

    this.authService.verificarPermissao('Grupos').then(c => { 
      this.permissions.btnCadastrar = c;
      this.loading = false;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  private handleError() {
    location.href = '/login';
  }

  buscar() {

    this.loading = true;

    this.listaAndares = [];

    this.andarServico.getAll(this.andares.andarId,
      this.andares.sedeId,
      this.andares.blocoId,
      this.andares.descricao,
      this.andares.ativo).subscribe(c => {
      this.listaAndares = c;

      this.loading = false;

        if (c.length == 0) {
          this.error = true;
          this.mensagem = "Não há registros para o critério de busca informado!";
        }

      });
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => { this.loading = false; this.sedes = c; });
  }

  carregaBlocos(sedeId) {
    this.blocoServico.getAll(null, sedeId, null, true).subscribe(c => {
      sedeId != '' ? this.listaBlocos = c : this.listaBlocos = [];
    });
  }



}

export class Permissions {
  btnCadastrar: boolean;
}

export class BindTable {
  codigo: number;
  sede: string;
  descricao: string;
  ativo: boolean;
}