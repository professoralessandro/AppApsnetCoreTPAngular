import { Component, OnInit } from '@angular/core';
import { TipoItens } from 'src/app/models/TipoItens';
import { TipoItensService } from 'src/app/services/tipo-itens.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tipo-itens-cadastro',
  templateUrl: './tipo-itens-cadastro.component.html',
  styleUrls: ['./tipo-itens-cadastro.component.scss']
})
export class TipoItensCadastroComponent implements OnInit {

  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public bloqueioQuiosqueLista: TipoItens[] = [];
  public bloqueioQuiosque: TipoItens = new TipoItens();
  success = false;
  error = false;
  mensagem = '';
  public loading = false;
  constructor(
    private quiosqueService: TipoItensService,
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.quiosqueService.getAll(Number(c.get('id')), null, null).subscribe(x => {
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
      console.log(this.bloqueioQuiosque);
      // this.quiosqueService.insert(this.bloqueioQuiosque).subscribe(c => {
      //   console.log(c);
      //   this.success = true;
      //   this.mensagem = ('Registro inserido com sucesso.');
      // });
      this.quiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.mensagem = 'Registro inserido com sucesso.';
        this.quiosqueService.getAll(c.tipoItemId, null, null).subscribe(x => {
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

      this.quiosqueService.edit(this.bloqueioQuiosque).subscribe(c => {
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
        this.loading = false;
      });

    }
  }
}