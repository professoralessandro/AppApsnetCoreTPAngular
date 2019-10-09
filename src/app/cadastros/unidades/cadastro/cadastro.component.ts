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
  public loading: boolean;
  public error: boolean;
  public sucess: boolean;
  public isContainer: boolean;
  public isBl: boolean;
  public blIdString: string;

  public mensagem = '';
  public lstLivros: Livros[] = [];
  public lstAutores: Autores[] = [];

  public lstBls: Bl[] = [];
  public lstcontainers: Container[] = [];

  public autor: Autores;
  public livro: Livros;

  public container: Container = new Container();
  public bl: Bl = new Bl();

  public isNew: boolean;
  public title: string;

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
    this.blIdString = '';
    this.loading = true;
    this.isBl = false;
    this.isContainer = false;
    this.isNew = false;
    this.bl = new Bl();
    this.lstBls = [];
    this.container = new Container();

    this.router.paramMap.subscribe(c => {
      if (c.get('local') != null) {
        this.title = c.get('local');
        if (c.get('local') == 'container') {
          this.isContainer = true;
        }
        else {
          this.isBl = true;
        }
      }
      else {
        this.isNew = true;
      }
    });

    if (this.isContainer) {
      this.blService.getAll().toPromise().then(lbl => {
        this.lstBls = lbl;
      });
    }

    if (this.isContainer) {
      this.router.paramMap.subscribe(c => {
        if (c.get('id') != null) {
          this.containerService.getAll(Number(c.get('id'))).toPromise().then(x => {
            this.loading = false;
            this.container = x[0];
            this.isNew = false;
          })
            .catch(e => {
              this.error = true;
              this.mensagem = 'Houve um erro ao buscar informações do Container'
            })
            .finally(() => { this.loading = false; });
        }
        else {
          this.loading = false;
          this.isNew = true;
        }
      })
        ;
    }
    else {
      this.router.paramMap.subscribe(c => {
        if (c.get('id') != null) {
          this.blService.getAll(Number(c.get('id'))).toPromise().then(x => {
            this.loading = false;
            this.bl = x[0];
            this.isNew = false;
          })
            .catch(e => {
              this.error = true;
              this.mensagem = 'Houve um erro ao buscar informações do Container'
            });
        }
        else {
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
  }//ON INIT

  novoContainer() {
    this.container.nomeConsignatario = '';
    this.container.nomeNavio = '';
    this.container.numero = null;
    this.container.tamanho = null;
    this.container.tipo = '';
  }

  novoBl() {
    this.bl.consignee = '';
    this.bl.navio = '';
    this.bl.numero = null;
  }

  validatorContainer() {
    debugger;
    let errorValidation: boolean = false;
    this.mensagem = '';

    if (this.container.numero === 0) {
      errorValidation = true;
      this.mensagem += 'O número do container deve ser maior que 0 \n';
    }
    if (this.container.numero === undefined || this.container.numero === null) {
      errorValidation = true;
      this.mensagem += 'O número do container é obrigatório \n';
    }
    if (this.container.tamanho === 0) {
      errorValidation = true;
      this.mensagem += 'O tamanho do container deve ser maior que 0 \n';
    }
    if (this.container.tamanho === null || this.container.tamanho === undefined) {
      errorValidation = true;
      this.mensagem += 'O tamanho do container é obrigatório \n';
    }
    if (this.container.tipo === '' || this.container.tipo === undefined || this.container.tipo === null) {
      errorValidation = true;
      this.mensagem += 'É obrigatório informar o tipo do container \n';
    }

    if (errorValidation === true) {
      return true;
    }
    else {
      return false;
    }
  }

  validatorBl() {
    let errorValidation: boolean = false;
    this.mensagem = '';

    if (this.bl.numero === 0) {
      errorValidation = true;
      this.mensagem += 'O número do BL deve ser maior que 0 \n';
    }
    if (this.bl.numero === null || this.bl.numero === undefined) {
      errorValidation = true;
      this.mensagem += 'O número do BL é obrigatorio \n';
    }
    if (this.bl.consignee === '' || this.bl.consignee === null || this.bl.consignee === undefined) {
      errorValidation = true;
      this.mensagem += 'O Consignatário do BL é um campo obrigatório \n';
    }
    if (this.bl.navio === '' || this.bl.navio === undefined || this.bl.navio == null) {
      errorValidation = true;
      this.mensagem += 'O Navio é um campo obrigatório \n';
    }

    if (errorValidation === true) {
      return true;
    }
    else {
      return false;
    }
  }

  cadastrarContainer() {
    this.sucess = false;
    this.error = false;

    this.mensagem = "";
    debugger;
    if (!this.validatorContainer()) {
      if (this.isNew) {
        debugger;
        this.containerService.insert(this.container).toPromise().then(c => {
          this.sucess = true;
          this.mensagem = ('Registro inserido com sucesso. \n');
        });
      } else {
        debugger;
        this.containerService.edit(this.container).toPromise().then(c => {
          debugger;
          this.sucess = true;
          this.mensagem = ('Registro atualizado com sucesso. \n');
        })
          .catch(e => {
            debugger;
            this.error = true;
            this.mensagem += 'Houve um erro ao inserir o registro. \n';
          })
          .finally(() => { this.loading = false; });
      }
    }
    else {
      debugger;
      this.error = true;
      this.mensagem += 'Houve um erro ao inserir o registro. \n';
    }
  }

  cadastrarBl() {
    this.sucess = false;
    this.error = false;

    this.mensagem = "";
    debugger;
    if (!this.validatorBl())
    {
      if (this.isNew) {
        this.blService.insert(this.bl).toPromise().then(c => {
          this.sucess = true;
          this.mensagem = ('Registro inserido com sucesso. \n');
        });
      } else {
        this.blService.edit(this.bl).toPromise().then(c => {
          this.sucess = true;
          this.mensagem = ('Registro atualizado com sucesso. \n');
        })
          .catch(e => {
            this.error = true;
            this.mensagem += 'Houve um erro ao inserir o registro. \n';
          })
          .finally(() => { this.loading = false; });
      }
    }
    else {
      this.error = true;
      this.mensagem += 'Houve um erro ao inserir o registro. \n';
    }
  }
}//CLASS


