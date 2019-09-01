import { Component, OnInit } from '@angular/core';
import { Feriados } from 'src/app/models/Feriados';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { FeriadosService } from 'src/app/services/feriados.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adm-feriados-cadastro',
  templateUrl: './adm-feriados-cadastro.component.html',
  styleUrls: ['./adm-feriados-cadastro.component.scss']
})
export class AdmFeriadosCadastroComponent implements OnInit {
  public bloqueioQuiosque: Feriados = new Feriados();
  sedes: Sedes[] = [];
  selecionados: number[] = [];

  success = false;
  error = false;
  mensagem = '';
  isNew = true;
  public loading = false;
  public dataInicio: any;

  constructor(
    private sedeServico: SedeService,
    private configQuiosqueService: FeriadosService,
    private commomService: CommonService,
    private router: ActivatedRoute,
    private routerNavigate: Router
  ) { }

  ngOnInit() {
    this.bloqueioQuiosque.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.bloqueioQuiosque = x[0];
          this.isNew = false;

          if (this.bloqueioQuiosque.data !== null) {
            const start: Date = new Date(this.bloqueioQuiosque.data);
            this.dataInicio = {
              date: {

                year: start.getFullYear(),
                month: start.getMonth() + 1,
                day: start.getDate()

              }
            };
          }

          this.isNew = false;
        });
      }
    });

    this.carregaSedes();
  }

  Mascara() {
    this.commomService.MascaraData(document.getElementById('txtdataValidadeDe'));
    this.commomService.MascaraData(document.getElementById('txtdataValidadeAte'));
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
      this.loading = false;
      return;
    }
    if (this.isNew) {
      this.selecionados.forEach(x => {
        this.bloqueioQuiosque.sedeId = x;
        this.configQuiosqueService.insert(this.bloqueioQuiosque).then(c => {
          this.success = true;
          this.loading = false;
          this.mensagem = 'Registro inserido com sucesso.';
          this.configQuiosqueService.getAll(c.feriadoId, null, null).subscribe(x => {
            this.bloqueioQuiosque = x[0];

            this.isNew = false;
          });

        }).catch(c => {
          this.error = true;
          this.mensagem = c.error;
        });
      });

    } else {
      this.configQuiosqueService.edit(this.bloqueioQuiosque).subscribe(c => {
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
        this.loading = false;
      });

    }

    this.routerNavigate.navigate(['/cadastros/adm-feriados']).then((e) => {
    });

  }


  novo() {
    window.location.reload();
  }

  selecionar(num: number) {
    let index: number = this.selecionados.indexOf(num);

    if (index != -1)
      this.selecionados.splice(index, 1)
    else
      this.selecionados.push(num)

    console.log("Lista de Selecionados:", this.selecionados);
  }

}
