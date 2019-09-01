import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { QuiosqueService } from 'src/app/services/quiosque.service';
import { QuiosqueOperacional } from 'src/app/models/QuiosqueOperacinal';
import { IMyDpOptions } from 'mydatepicker';
import { MaskedDate } from 'src/app/_helpers/DateMasked';

@Component({
  selector: 'app-quiosque',
  templateUrl: './quiosque.component.html',
  styleUrls: ['./quiosque.component.scss'],
})
export class QuiosqueComponent implements OnInit {
  public loading = false;
  public sedes: Sedes[] = [];
  public Quiosque: QuiosqueOperacional = new QuiosqueOperacional();
  public quiosques: QuiosqueOperacional[] = [];

  public paginaAtual = 1;
  dateMask = MaskedDate;

  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    minYear: 1920,
    maxYear: 1999,
    showTodayBtn: false,
  };

  modalRef: BsModalRef;
  required = false;

  constructor(private modalService: BsModalService,
    private sedeServico: SedeService,
    private quiosque: QuiosqueService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.Quiosque.nomeBeneficiario = '';
    this.Quiosque.cpf = '';
    this.Quiosque.numeroReserva = null;
    this.Quiosque.unidade = 0;
    this.Quiosque.statusReserva = '';
    //nome?: string, cpf?: string, numeroReserva?: number, unidade?: number, statusReserva?: string, dataInicio?: Date, dataFim?: Date) {
    this.quiosque.getAll('', '', null, 0, null, null, null).toPromise().then(c => {
      console.log(c);
    });
    // this.Quiosque.dataInicio,
    //   this.Quiosque.dataFim,

    this.carregaSedes();
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }


  buscar() {
    this.required = false;
    this.loading = true;
    this.quiosques = [];
    this.quiosque.getAll(this.Quiosque.nomeBeneficiario, this.Quiosque.cpf, this.Quiosque.numeroReserva, this.Quiosque.unidade, this.Quiosque.statusReserva, this.Quiosque.dataInicio, this.Quiosque.dataFim).toPromise().then(c => {
      this.quiosques = c.items;
      if (c.items.length > 0) {
        this.required = false;
      } else {
        this.required = true;
      }
      this.loading = false;

    });

  }
}
