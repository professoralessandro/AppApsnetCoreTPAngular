import { Component, OnInit } from '@angular/core';
import { SedeService } from 'src/app/services/sede.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';
import { FormasPagamento } from 'src/app/models/FormasPagamento';
import { Sedes } from 'src/app/models/Sedes';
import { FormasPagamentoService } from 'src/app/services/formas-pagamento.service';

@Component({
  selector: 'app-adm-formas-pagamento-cadastro',
  templateUrl: './adm-formas-pagamento-cadastro.component.html',
  styleUrls: ['./adm-formas-pagamento-cadastro.component.scss']
})
export class AdmFormasPagamentoCadastroComponent implements OnInit {
  public bloqueioQuiosque: FormasPagamento = new FormasPagamento();

  success = false;
  error = false;
  mensagem = '';
  isNew = true;
  public loading = false;
  constructor(
    private configQuiosqueService: FormasPagamentoService,
    private router: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });
      }
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
      this.loading = false;
      return;
    }

    if (this.isNew) {
      this.configQuiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.mensagem = 'Registro inserido com sucesso.';
        this.configQuiosqueService.getAll(c.formaPagamentoId, null, null).subscribe(x => {
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