import { Component, OnInit } from '@angular/core';
import { Quiosques } from 'src/app/models/Quiosques';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { QuiosqueUnidadeService } from 'src/app/services/quiosque-unidade.service';

@Component({
  selector: 'app-quiosque-unidades-cadastro',
  templateUrl: './quiosque-unidades-cadastro.component.html',
  styleUrls: ['./quiosque-unidades-cadastro.component.scss']
})
export class QuiosqueUnidadesCadastroComponent implements OnInit {
  public bloqueioQuiosque: Quiosques = new Quiosques();
  sedes: Sedes[] = [];

  success = false;
  error = false;
  mensagem = '';
  isNew = true;
  public loading = false;
  constructor(
    private sedeServico: SedeService,
    private configQuiosqueService: QuiosqueUnidadeService,
    private commomService: CommonService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), 0, null).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });
      }
    });

    this.carregaSedes();
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
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
        this.configQuiosqueService.getAll(c.quiosqueId, 0, null).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });
        this.loading = false;

      }).catch(c => {
        this.error = true;
        this.mensagem = c.error;
        this.loading = false;
      })

    } else {
      this.configQuiosqueService.edit(this.bloqueioQuiosque).subscribe(c => {
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
        this.loading = false;
      });

    }
  }

  novo() {
    window.location.reload();
  }

}
