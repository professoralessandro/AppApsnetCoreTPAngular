import { Component, OnInit } from '@angular/core';
import { TipoItens } from 'src/app/models/TipoItens';
import { Sedes } from 'src/app/models/Sedes';
import { ItensLocacaoTabelas } from 'src/app/models/ItensLocacaoTabelas';
import { ItensLocacaoService } from 'src/app/services/itens-locacao.service';
import { ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';
import { TipoItensService } from 'src/app/services/tipo-itens.service';

@Component({
  selector: 'app-itens-locacao-cadastro',
  templateUrl: './itens-locacao-cadastro.component.html',
  styleUrls: ['./itens-locacao-cadastro.component.scss']
})
export class ItensLocacaoCadastroComponent implements OnInit {

  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public sedes: Sedes[] = [];
  public tipoItens: TipoItens[] = [];
  public bloqueioQuiosque: ItensLocacaoTabelas = new ItensLocacaoTabelas();
  success = false;
  error = false;
  mensagem = '';
  public loading = false;
  constructor(
    private quiosqueService: ItensLocacaoService,
    private router: ActivatedRoute,
    private sedeServico: SedeService,
    private tipoItensServico: TipoItensService
  ) { }

  ngOnInit() {
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.quiosqueService.getAll(Number(c.get('id')), null, 0).subscribe(x => {
          this.bloqueioQuiosque = x[0];

          this.isNew = false;
        });
      }
    });

    this.bindSedes();
    this.carregaTipoItens();
  }

  bindSedes() {
    this.sedes = [];
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }

  carregaTipoItens() {
    this.tipoItensServico.getAll(null, null, true, null).subscribe(c => {
      this.tipoItens = c;
    });
  }

  isValid() {
    return true;
  }

  salvar() {
    this.loading = true;
    // console.log(this.bloqueioQuiosque);
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
      // this.bloqueioQuiosque.dataInicio = new Date(this.bloqueioQuiosque.dataInicio.toUTCString());
      // this.bloqueioQuiosque.dataFim = new Date(this.bloqueioQuiosque.dataFim.toUTCString());
      this.quiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.loading = false;
        this.mensagem = 'Registro inserido com sucesso.';
        this.quiosqueService.getAll(c.itensLocacaoTabelaId, null, 0).subscribe(x => {
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

      this.quiosqueService.edit(this.bloqueioQuiosque).subscribe(c => {
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
        this.loading = false;
      });

    }
  }
}

