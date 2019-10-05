import { Component, OnInit, TemplateRef } from '@angular/core';
import { LivroService } from 'src/app/services/livro.service';
import { AutorService } from 'src/app/services/autor.service';

import { ContainerService } from 'src/app/services/container.service';
import { BlService } from 'src/app/services/bl.service';

import { Livros } from 'src/app/models/Livro';
import { Autores } from 'src/app/models/Autor';
import { Bl } from 'src/app/models/Bl';
import { Container } from 'src/app/models/Container';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public loading : boolean;
  public error : boolean;
  public sucess : boolean;
  public isContainer : boolean;
  public isBl : boolean;

  public mensagem = '';
  public lstLivros: Livros[] = [];
  public lstAutores: Autores[] = [];

  public lstBls: Bl[] = [];
  public lstcontainers: Container[] = [];

  public autor: Autores;
  public livro: Livros;

  public container: Container = new Container();
  public bl: Bl = new Bl();

  public isNew : boolean;

  constructor(
    private autorService: AutorService,
    private livroService: LivroService,
    private blService: BlService,
    private containerService: ContainerService,
    private router: ActivatedRoute,
    private commonService: CommonService
  ) { }

  required: boolean = false;

  ngOnInit() {
    this.isBl = false;
    this.isContainer = false;
    this.isNew = false;
    this.bl = new Bl();
    this.container = new Container();

    this.router.paramMap.subscribe(c => {
      if (c.get('local') != null) {
        if(c.get('local') == 'container')
        {
          this.isContainer = true;
        }
        else
        {
          this.isBl = true;
        }
      }
      else
      {
        this.isNew = true;
      }   
    });

    if(this.isContainer )
    {
      this.router.paramMap.subscribe(c => {
        if (c.get('id') != null) {
          this.containerService.getAll(Number(c.get('id'))).toPromise().then(x => {
            this.loading = false;
            this.container = x[0];         
            this.isNew = false;
          })
          .catch( e=> {
            this.error = true;
            this.mensagem = 'Houve um erro ao buscar informações do Container'
          });
        }
        else
        {
          this.loading = false;
          this.isNew = true;
        }   
      })
      ;
    }
    else
    {
      this.router.paramMap.subscribe(c => {
        if (c.get('id') != null) {
          this.blService.getAll(Number(c.get('id'))).toPromise().then(x => {
            this.loading = false;
            this.bl = x[0];         
            this.isNew = false;
          })
          .catch( e=> {
            this.error = true;
            this.mensagem = 'Houve um erro ao buscar informações do Container'
          });
        }
        else
        {
          this.loading = false;
          this.isNew = true;
        }   
      });
    }

    
    this.loading = true;
    this.autor = new Autores();
    this.livro = new Livros();
    this.bl = new Bl();
    this.container = new Container();

    this.lstAutores = [];
    this.lstBls = [];

    this.loading = false;
  }

  
}


