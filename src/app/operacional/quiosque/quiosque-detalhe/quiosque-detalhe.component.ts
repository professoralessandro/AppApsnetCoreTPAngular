import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { QuiosqueOperacional } from 'src/app/models/QuiosqueOperacinal';
import { QuiosqueService } from 'src/app/services/quiosque.service';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { IMyDpOptions } from 'mydatepicker';
import { ActivatedRoute } from '@angular/router';
import { QuiosqueAtribuidos } from 'src/app/models/QuiosqueAtribuidos';
import { QuiosqueDisponivelSubstitucao } from 'src/app/models/QuiosqueDisponivelSubstituicao';
import { isNgTemplate } from '@angular/compiler';
import { ReactiveFormsModule } from '@angular/forms'



@Component({
  selector: 'app-quiosque-detalhe',
  templateUrl: './quiosque-detalhe.component.html',
  styleUrls: ['./quiosque-detalhe.component.scss']
})
export class QuiosqueDetalheComponent implements OnInit {
  public loading = false;
  public sedes: Sedes[] = [];
  public Quiosque: QuiosqueOperacional = new QuiosqueOperacional();
  public QuiosqueAtribuido: QuiosqueAtribuidos = new QuiosqueAtribuidos();
  public QuiosqueDisponivel: QuiosqueDisponivelSubstitucao[] = [];
  modalRef: BsModalRef;
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    minYear: 1920,
    maxYear: 1999,
    showTodayBtn: false,
  };

  sucesso = false;
  mensagem = '';
  op1 = 0;
  op2 = 0;

  constructor(private modalService: BsModalService,
    private quiosque: QuiosqueService,
    private sedeServico: SedeService,
    private router: ActivatedRoute, ) { }

  openModal(template: TemplateRef<any>) {
    this.loading = true;
    this.sucesso = false;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.quiosque.getQuiosqueDisponivelSubstituicao(Number(c.get('id'))).toPromise().then(z => {
          this.QuiosqueDisponivel = z.items;
          this.modalRef = this.modalService.show(template);
          this.loading = false;
        });
      }
    });

  }

  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.Quiosque.nomeBeneficiario = '';
        this.Quiosque.cpf = '';
        this.Quiosque.numeroReserva = null;
        this.Quiosque.unidade = 0;
        this.Quiosque.statusReserva = '';
        this.quiosque.getAll('', '', Number(c.get('id')), 0, null, null, null).toPromise().then(v => {
          this.Quiosque = v.items[0];
          this.quiosque.getQuiosqueAtribuidos(Number(c.get('id'))).toPromise().then(x => {
            this.QuiosqueAtribuido = x.items[0];
          });


          console.log(this.Quiosque)
        });
        // this.Quiosque.dataInicio,
        //   this.Quiosque.dataFim,
        this.carregaSedes();

      }
    });
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }

  selecionado(id: number, id2: number) {
    this.op1 = id;
    this.op2 = id2;
  }

  Salvar() {
    this.quiosque.alterarQuiosque(this.QuiosqueAtribuido.reservaQuiosqueId, this.op2, this.op1)
      .toPromise()
      .then(c => {
        this.modalRef.hide();
        this.sucesso = true;
        this.mensagem = 'Troca realizada com sucesso.';


        this.quiosque.getQuiosqueAtribuidos(this.QuiosqueAtribuido.reservaQuiosqueId).toPromise().then(x => {
          this.QuiosqueAtribuido = x.items[0];
        });
      })
      .catch(e => {
        this.modalRef.hide();
        console.log(e.error);
      });
  }
}
