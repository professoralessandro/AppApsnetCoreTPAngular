import { Component, OnInit } from '@angular/core';
import { AndarService } from 'src/app/services/andar.service';
import { Andares } from 'src/app/models/Andares';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { BlocoService } from 'src/app/services/bloco.service';
import { Blocos } from 'src/app/models/Blocos';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cadastro-andares',
  templateUrl: './cadastro-andares.component.html',
  styleUrls: ['./cadastro-andares.component.scss']
})

export class CadastroAndaresComponent implements OnInit {

  public loading = false;
  andares: Andares = new Andares();
  public sedes: Sedes[] = [];
  public blocos: Blocos[] = [];
  isNew = true;
  public listaAndares: Andares[] = [];
  public bloco: Blocos = new Blocos();
  public listaBlocos: Blocos[] = [];
  permissions: Permissions = new Permissions();
  success = false;
  error = false;
  mensagem = "";


  constructor(
    private andarServico: AndarService,
    private sedeServico: SedeService,
    private blocoServico: BlocoService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private commonService: CommonService,
    private authService: AuthenticationService) { }

  ngOnInit() {
    this.loading = true;
    this.andares = new Andares();
    this.andares.descricao = '';
    this.andares.ativo = true;
    this.andares.sedeId = 0;
    this.andares.blocoId = 0;
    this.success = false;
    this.error = false;
    this.mensagem = "";

    this.isNew = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.loading = false;
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
     
      if (c.get('id') != null) {
        this.andarServico.getAll(Number(c.get('id')), null, null, '', '').subscribe(x => {
          this.andares = x[0];
          this.loading = false;
          //alert(JSON.stringify(x))
          this.isNew = false;
          this.carregaSedes();
          this.carregaBlocos(this.andares.sedeId)
        });
      }
      else {
        this.loading = false;
      }
    });
  }

  Mascara(){
    this.commonService.SomenteNumeros(document.getElementById('txtOrdemAndar'));
    this.commonService.SomenteNumeros(document.getElementById('txtIdAndar'));
  }

  private handleError() {
    location.href = '/login';
  }

  cadastrar() {
    this.loading = true;
    this.success = false;
    this.error = false;
    this.mensagem = "";

    if (this.isNew) {
      this.andarServico.insert(this.andares).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = "Registro inserido com sucesso";
      });
    } else {
      this.andarServico.edit(this.andares).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = "Registro atualizado com sucesso";
        this.alertService.success('Registro atualizado com sucesso.');
      });
    }
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
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