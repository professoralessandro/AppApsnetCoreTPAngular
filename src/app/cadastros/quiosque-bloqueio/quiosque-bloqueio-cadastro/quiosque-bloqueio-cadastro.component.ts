import { Component, OnInit } from '@angular/core';
import { BloqueioQuiosque } from 'src/app/models/BloqueioQuiosque';
import { QuiosqueBloqueioService } from 'src/app/services/quiosque-bloqueio.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormArray } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
// import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from 'ngx-bootstrap/datepicker';


@Component({
  selector: 'app-quiosque-bloqueio-cadastro',
  templateUrl: './quiosque-bloqueio-cadastro.component.html',
  styleUrls: ['./quiosque-bloqueio-cadastro.component.scss']
})
export class QuiosqueBloqueioCadastroComponent implements OnInit {

  constructor(
    private quiosqueService: QuiosqueBloqueioService,
    private comonService: CommonService,
    private router: ActivatedRoute,
    private sedeServico: SedeService,
    private commomService: CommonService
  ) { }

  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public loading = false;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'dd/mm/yyyy',
  };

  public imagens: BloqueioQuiosque[] = [];
  public bloqueioQuiosqueLista: BloqueioQuiosque[] = [];
  public sedes: Sedes[] = [];
  public bloqueioQuiosque: BloqueioQuiosque = new BloqueioQuiosque();
  success = false;
  error = false;
  mensagem = '';
  public dataInicio: any;
  public dataFim: any;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    minYear: 1920,
    maxYear: 1999,
    showTodayBtn: false,
  };

  getAllErrors(form: FormGroup | FormArray): { [key: string]: any; } | null {
    let hasError = false;
    const result = Object.keys(form.controls).reduce((acc, key) => {
      const control = form.get(key);
      const errors = (control instanceof FormGroup || control instanceof FormArray)
        ? this.getAllErrors(control)
        : control.errors;
      if (errors) {
        acc[key] = errors;
        hasError = true;
      }
      return acc;
    }, {} as { [key: string]: any; });
    return hasError ? result : null;
  }

  ngOnInit() {
    // this.bloqueioQuiosque.dataInicio = new Date();
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;
    // this.bloqueioQuiosque.sedeId = null;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.loading = true;
        this.quiosqueService.getAll(Number(c.get('id')), null, 0).subscribe(x => {
          this.bloqueioQuiosque = x[0];
          this.loading = false;

          if (this.bloqueioQuiosque.dataInicio !== null) {
            const start: Date = new Date(this.bloqueioQuiosque.dataInicio);
            this.dataInicio = {
              date: {

                year: start.getFullYear(),
                month: start.getMonth() + 1,
                day: start.getDate()

              }
            };
          }

          if (this.bloqueioQuiosque.dataFim !== null) {
            const start: Date = new Date(this.bloqueioQuiosque.dataFim);
            this.dataFim = {
              date: {

                year: start.getFullYear(),
                month: start.getMonth() + 1,
                day: start.getDate()

              }
            };
          }

          // console.log((x[0].dataInicio));
          // this.bloqueioQuiosque.dataInicio = new Date(x[0].dataInicio);
          // this.bloqueioQuiosque.dataFim = new Date(x[0].dataFim);
          this.isNew = false;
        });
      }
    });

    this.bindSedes();
  }

  bindSedes() {
    this.sedes = [];
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }

  isValid() {
    return true;
  }

  Mascara() {
    // this.commomService.MascaraData(document.getElementById('txtdataValidadeDe'));
    // this.commomService.MascaraData(document.getElementById('txtdataValidadeAte'));
  }

  salvar() {
    this.loading = true;
    // console.log(this.bloqueioQuiosque);
    this.success = false;
    this.mensagem = '';
    this.error = false;

    if (!this.isValid()) {
      this.loading = false;
      this.error = true;
      this.mensagem = 'Preencha todos os campos em amarelo.';
      return;
    }

    if (this.isNew) {
      // this.bloqueioQuiosque.dataInicio = new Date(this.bloqueioQuiosque.dataInicio.toUTCString());
      // this.bloqueioQuiosque.dataFim = new Date(this.bloqueioQuiosque.dataFim.toUTCString());
      this.quiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.loading = false;
        this.mensagem = 'Registro inserido com sucesso.';
        this.quiosqueService.getAll(c.bloqueioQuiosqueId, null, 0).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });
      }).catch(c => {
        this.error = true;
        this.loading = false;
        this.mensagem = c.error;
      })

    } else {

      this.quiosqueService.edit(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.loading = false;
        this.mensagem = ('Registro atualizado com sucesso.');
      }).catch(ex => {
        this.error = true;
        this.loading = false;
        this.mensagem = ex.error;
      });

    }
  }
}
