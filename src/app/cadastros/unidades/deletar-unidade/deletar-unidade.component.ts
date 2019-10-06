import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
//import { SedeService } from 'src/app/services/sede.service';
import { ContainerService } from 'src/app/services/container.service';
import { BlService } from 'src/app/services/bl.service';

import { Livros } from 'src/app/models/Livro';
import { Autores } from 'src/app/models/Autor';
import { Bl } from 'src/app/models/Bl';
import { Container } from 'src/app/models/Container';

@Component({
  selector: 'app-deletar-unidade',
  templateUrl: './deletar-unidade.component.html',
  styleUrls: ['./deletar-unidade.component.scss']
})
export class DeletarUnidadeComponent implements OnInit {

  public message: string;
  public title: string;
  public isContainer: boolean;
  public isBl: boolean;
  public error: boolean;
  public loading: boolean;
  public id: number;

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private blService: BlService,
    private containerService: ContainerService,
    private routerNavigate: Router) { }

  ngOnInit() {
    this.loading = true;
    this.error = false;
    this.message = "";
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
    });

    if (this.isContainer) {
      this.router.paramMap.subscribe(params => {
        if (params.get('id') != null) {
          this.id = Number(params.get('id'));
          this.containerService.getAll(Number(params.get('id'))).toPromise().then(x => {
            this.message = x[0].numero + ' - ' + x[0].tipo;
            // alert(JSON.stringify(x));
          })
            .catch(e => {
              this.error = true;
              this.message = 'Houve um erro ao tentar deletar o registro'
            })
            .finally(() => (this.loading = false));;
        }
      });
    }
    else {
      this.router.paramMap.subscribe(params => {
        this.id = Number(params.get('id'));
        if (params.get('id') != null) {
          this.blService.getAll(Number(params.get('id'))).toPromise().then(x => {
            this.message = x[0].numero + ' - ' + x[0].consignee;
          })
            .catch(e => {
              this.error = true;
              this.message = 'Houve um erro ao tentar deletar o registro'
            })
            .finally(() => (this.loading = false));;
        }
      });
    }
  }//ONINIT

  deletarBl() {
    debugger;
    this.loading = true;

    if (this.id != null) {

      this.blService.delete(this.id).toPromise().then(c => {
        debugger;
        this.routerNavigate.navigate(['/cadastros/porto']).then((e) => {
        })
          .catch(e => {
            this.error = true;
            this.message = 'Houve um erro ao tentar deletar o registro'
          })
          .finally(() => (this.loading = false));;
      });

    }
  }//DELETAR BL

  deletarContainer() {
    debugger;
    this.router.paramMap.subscribe(params => {
      if (this.id != null) {

        this.containerService.delete(params.get('id')).subscribe(c => {
          debugger;
          this.routerNavigate.navigate(['/cadastros/porto']).then((e) => {
          })
            .catch(e => {
              this.error = true;
              this.message = 'Houve um erro ao tentar deletar o registro'
            })
            .finally(() => (this.loading = false));;
        });
      }
    })
  }//DELETAR CONTAINER
}//CLASSE
