import { Component, OnInit } from '@angular/core';
import { Categorias } from 'src/app/models/Categorias';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grupo-categorias-cadastro',
  templateUrl: './grupo-categorias-cadastro.component.html',
  styleUrls: ['./grupo-categorias-cadastro.component.scss']
})
export class GrupoCategoriasCadastroComponent implements OnInit {

  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public bloqueioQuiosqueLista: Categorias[] = [];
  public bloqueioQuiosque: Categorias = new Categorias();
  success = false;
  error = false;
  mensagem = '';
  public loading = false;
  constructor(
    private quiosqueService: CategoriasService,
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
      return;
    }

    if (this.isNew) {

      // this.quiosqueService.insert(this.bloqueioQuiosque).subscribe(c => {
      //   console.log(c);
      //   this.success = true;
      //   this.mensagem = ('Registro inserido com sucesso.');
      // });
      this.quiosqueService.insert(this.bloqueioQuiosque).then(c => {
        this.success = true;
        this.mensagem = 'Registro inserido com sucesso.';
        this.quiosqueService.getAll(c.categoriaId, null, null).subscribe(x => {
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