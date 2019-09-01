import { Component, OnInit } from '@angular/core';
import { BloqueioQuiosque } from 'src/app/models/BloqueioQuiosque';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { QuiosqueBloqueioService } from 'src/app/services/quiosque-bloqueio.service';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { IMyDpOptions } from 'mydatepicker';

@Component({
  selector: 'app-quiosque-bloqueio',
  templateUrl: './quiosque-bloqueio.component.html',
  styleUrls: ['./quiosque-bloqueio.component.scss']
})
export class QuiosqueBloqueioComponent implements OnInit {
  public loading = false;
  public listaBloqueios: BloqueioQuiosque[] = [];
  public bloqueioQuiosque: BloqueioQuiosque = new BloqueioQuiosque();
  // tslint:disable-next-line: no-use-before-declare
  permissions: Permissions = new Permissions();
  public sedes: Sedes[] = [];
  public dataInicio: any;
  public dataFim: any;
  public paginaAtual = 1;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    minYear: 1920,
    maxYear: 1999,
    showTodayBtn: false,
  };


  constructor(
    private authService: AuthenticationService,
    private quiosqueBloqueio: QuiosqueBloqueioService,
    private sedeServico: SedeService
  ) { }

  required = false;

  ngOnInit() {
    this.bloqueioQuiosque.sedeId = 0;
    this.bloqueioQuiosque.ativo = true;

    this.authService.verificarPermissao('Grupos').then(c => {
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);

    this.carregaSedes();
  }

  buscar() {
    this.loading = true;

    this.listaBloqueios = [];
    this.quiosqueBloqueio.getAll(this.bloqueioQuiosque.bloqueioQuiosqueId, this.bloqueioQuiosque.descricao,
      this.bloqueioQuiosque.sedeId, this.bloqueioQuiosque.justificativa, this.bloqueioQuiosque.dataInicio,
      this.bloqueioQuiosque.dataFim, this.bloqueioQuiosque.ativo).subscribe(c => {
        this.listaBloqueios = c;
        this.loading = false;


        if (c.length > 0) {
          this.required = false;
        } else {
          this.required = true;
        }
      });
  }

  carregaSedes() {
    this.loading = true;
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });

  }

  private handleError() {
    location.href = '/login';
  }

}

export class Permissions {
  btnCadastrar: boolean;
}
