import { Component, OnInit } from '@angular/core';
import { BloqueioQuiosque } from 'src/app/models/BloqueioQuiosque';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SedeService } from 'src/app/services/sede.service';
import { Sedes } from 'src/app/models/Sedes';
import { QuiosqueConfigService } from 'src/app/services/quiosque-config.service';
import { ConfiguracaoReservaQuiosques } from 'src/app/models/ConfiguracaoReservaQuiosques';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-quiosque-config-cadastro',
  templateUrl: './quiosque-config-cadastro.component.html',
  styleUrls: ['./quiosque-config-cadastro.component.scss']
})
export class QuiosqueConfigCadastroComponent implements OnInit {
  public bloqueioQuiosque: ConfiguracaoReservaQuiosques = new ConfiguracaoReservaQuiosques();
  sedes: Sedes[] = [];
  public dataInicio: any;
  success = false;
  error = false;
  mensagem = '';
  isNew = true;

  public Editor1 = ClassicEditor;
  public loading = false;
  constructor(
    private sedeServico: SedeService,
    private configQuiosqueService: QuiosqueConfigService,
    private commomService: CommonService,
    private router: ActivatedRoute,
  ) { this.bloqueioQuiosque.termoresponsabilidade = ''; }

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
    this.loading = true;
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;
    this.bloqueioQuiosque.termoresponsabilidade = '';
    this.bloqueioQuiosque.sedeId = 0;
    // this.bloqueioQuiosque.qtdDiasReservaAdm = 0;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), null, 0, null).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          if (this.bloqueioQuiosque.dataInicial !== null) {
            const start: Date = new Date(this.bloqueioQuiosque.dataInicial);
            this.dataInicio = {
              date: {

                year: start.getFullYear(),
                month: start.getMonth() + 1,
                day: start.getDate()

              }
            };
          }

          this.isNew = false;
        });
      }
    });

    this.carregaSedes();

  }

  Mascara() {
    this.commomService.MascaraData(document.getElementById('txtdataValidadeDe'));
    this.commomService.MascaraData(document.getElementById('txtdataValidadeAte'));
    this.commomService.SomenteNumeros(document.getElementById('txtCodigo'));
    this.commomService.MascaraHora(document.getElementById('txtHora'));
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
      this.loading = false;
    });
  }

  isValid() {
    return true;
  }

  salvar() {
    this.loading = true;
    this.success = false;
    this.mensagem = '';
    this.error = false;

    if (!this.isValid()) {
      this.error = true;
      this.mensagem = 'Preencha todos os campos em amarelo.';
      return;
      this.loading = false;
    }

    if (this.isNew) {
      this.configQuiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.mensagem = 'Registro inserido com sucesso.';
        this.configQuiosqueService.getAll(c.configuracaoReservaQuiosqueId, null, 0).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });

        this.loading = false;


      }).catch(c => {
        this.error = true;
        this.mensagem = c.error;
        this.loading = false;
      });

    } else {
      this.configQuiosqueService.edit(this.bloqueioQuiosque).toPromise().then(c => {
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
        this.loading = false;
      }).catch(c => {
        this.error = true;
        this.mensagem = c.error;
        this.loading = false;
      });

    }
  }

  novo() {
    window.location.reload();
  }

}