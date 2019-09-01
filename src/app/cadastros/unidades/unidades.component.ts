import { Component, OnInit } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { AutorService } from 'src/app/services/autor.service';
import { Livros } from 'src/app/models/Livro';
import { Autores } from 'src/app/models/Autor';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.scss']
})

export class UnidadesComponent implements OnInit {
  public loading = false;
  public error = false;
  public sucess = false;
  public isAutor = false;
  public isTodos = false;

  public mensagem = '';
  public lstLivros: Livros[] = [];
  public lstAutores: Autores[] = [];

  public autor: Autores = new Autores();
  public livro: Livros = new Livros();

  constructor(
    private autorService: AutorService,
    private livroService: LivroService,
    private commonService: CommonService
    ) { }

  required: boolean = false;

  ngOnInit() {
    this.loading = true;

    this.autor = new Autores();
    this.livro = new Livros();
    this.loading = false;
  }

  buscarLivros() {
    this.isTodos = false;
    this.isAutor = false;

    debugger;
    this.loading = true;
    this.mensagem = '';
    this.lstLivros = [];
          this.livroService.getAll().toPromise().then( a =>{
            this.livro = new Livros();
            this.lstLivros = [];
            this.lstLivros = a;
        }).then( e => { this.loading= false;});;
  }

  buscarAutores()
  {
    this.isTodos = false;
    this.isAutor = true;

    debugger;
    this.loading = true;
    this.mensagem = '';

    this.lstAutores = [];
    this.lstLivros = [];
    this.autorService.getAll().toPromise().then(c => {
      this.lstAutores = c;
      //alert(JSON.stringify(c));
      debugger;
      if(c.length > 0) {
        this.sucess = true;
        this.error = false;
      }
      else {
        this.error = true;
        this.sucess = false;
        this.mensagem = 'Erro ao buscar os Autores';
      }        
    }).then( e => { this.loading= false;});
  }

  buscar()
  {
    this.isTodos = true;
    this.isAutor = true;

    debugger;
    this.loading = true;
    this.mensagem = '';

    this.lstAutores = [];
    this.lstLivros = [];
    this.autorService.getAll().toPromise().then(c => {
      
      this.lstAutores = c;
      //C = AUTORES
      //alert(JSON.stringify(c));
      this.lstAutores.forEach( f => {
        this.livroService.getAll(f.livroId).toPromise().then( l =>{
          f.nomeLivro = l[0].nome;
          f.precoLivro = l[0].preco;
          f.quantidadeLivro = l[0].quantidade;
        }).then(e => {this.loading = false;});
      });    
    });
  }
  
}//CLASS