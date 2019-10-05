import { Component, OnInit } from '@angular/core';

import { LivroService } from 'src/app/services/livro.service';
import { AutorService } from 'src/app/services/autor.service';

import { ContainerService } from 'src/app/services/container.service';
import { BlService } from 'src/app/services/bl.service';

import { Livros } from 'src/app/models/Livro';
import { Autores } from 'src/app/models/Autor';
import { Bl } from 'src/app/models/Bl';
import { Container } from 'src/app/models/Container';
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

  public lstBls: Bl[] = [];
  public lstcontainers: Container[] = [];

  public autor: Autores = new Autores();
  public livro: Livros = new Livros();

  public container: Container = new Container();
  public bl: Bl = new Bl();

  constructor(
    private autorService: AutorService,
    private livroService: LivroService,
    private blService: BlService,
    private containerService: ContainerService,
    private commonService: CommonService
  ) { }

  required: boolean = false;

  ngOnInit() {
    this.loading = true;
    this.autor = new Autores();
    this.livro = new Livros();
    this.bl = new Bl();
    this.container = new Container();

    this.lstAutores = [];
    this.lstBls = [];

    this.loading = false;
  }

  //BUSCA CONTAINERS
  buscarLivros() {
    this.isTodos = false;
    this.isAutor = false;

    this.loading = true;
    this.mensagem = '';

    this.lstAutores = [];
    this.lstBls = [];

    this.containerService.getAll().toPromise().then(cts => {
      if (cts.length > 0) {
        this.sucess = true;
        this.error = false;
        this.mensagem = '';
        this.lstcontainers = cts;
      }
      else {
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      }
    })
      .catch(e => {
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      })
      .finally(() => { this.loading = false });
  }

  //BUSCA BLS
  buscarAutores() {
    this.isTodos = false;
    this.isAutor = true;

    this.loading = true;
    this.mensagem = '';

    this.lstAutores = [];
    this.lstBls = [];

    this.blService.getAll().toPromise().then(bls => {
      if (bls.length > 0) {
        this.sucess = true;
        this.error = false;
        this.mensagem = '';
        this.lstBls = bls;
      }
      else {
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      }
    })
      .catch(e => {
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      })
      .finally(() => { this.loading = false });
  }

  //BUSCA POR TODOS
  buscar() {
    this.isTodos = true;
    this.isAutor = true;

    this.loading = true;
    this.mensagem = '';

    this.lstAutores = [];
    this.lstBls = [];

    this.blService.getAll().toPromise().then(bls => {
      if (bls.length > 0) {
        this.sucess = true;
        this.error = false;
        this.mensagem = '';
        this.lstBls = bls;
      }
      else {
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      }
    })
      //LISTA OS CONTAINERS
      .then(t => {
        this.containerService.getAll().toPromise().then(cts => {
          if (cts.length > 0) {
            this.sucess = true;
            this.error = false;
            this.mensagem = '';
            this.lstcontainers = cts;

            this.lstcontainers.forEach(flc => {
              this.blService.getAll(flc.blId).toPromise().then(bls => {
                debugger;
                if (flc.blId == bls[0].blId) {

                  flc.numeroBl = bls[0].numero;
                  flc.nomeConsignatario = bls[0].consignee;
                  flc.nomeNavio = bls[0].navio;
                }
              })

              /*
              this.lstBls.forEach(bls => {
                debugger;
                if (flc.blId == bls.blId) {


                  flc.numeroBl = bls.numero;
                  flc.nomeConsignatario = bls.consignee;
                  flc.nomeNavio = bls.navio;
                }
              })
              */
            })
          }
          else {
            this.sucess = false;
            this.error = true;
            this.mensagem = 'Houve um erro ao buscar por BLs';
          }
        })
          .catch(e => {
            this.sucess = false;
            this.error = true;
            this.mensagem = 'Houve um erro ao buscar por BLs';
          })

      })
      .catch(e => {
        this.loading = false;
        this.sucess = false;
        this.error = true;
        this.mensagem = 'Houve um erro ao buscar por BLs';
      })
      .finally(() => { this.loading = false });
    //METODO ANTERIOR
    /*
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
    */
  }

}//CLASS