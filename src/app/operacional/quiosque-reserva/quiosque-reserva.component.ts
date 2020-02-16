import { Component, OnInit, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService, TypeaheadMatch } from "ngx-bootstrap";
import { Sedes } from "src/app/models/Sedes";
import { QuiosqueReserva } from "src/app/models/QuiosqueReserva";
import { SedeService } from "src/app/services/sede.service";
import { IMyDpOptions, IMyDate } from "mydatepicker";
import { QuiosqueService } from "src/app/services/quiosque.service";
import { Observable, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { QuiosqueReservaDatas } from "src/app/models/QuiosqueReservaDatas";
import { QuiosqueReservaVigente } from "src/app/models/QuiosqueReservaVigente";
import { Router } from "@angular/router";
import { MaskedDate } from "src/app/_helpers/DateMasked";
import { AssociadoService } from "@app/services/associados.service";

@Component({
  selector: "app-quiosque-reserva",
  templateUrl: "./quiosque-reserva.component.html",
  styleUrls: ["./quiosque-reserva.component.scss"]
})
export class QuiosqueReservaComponent implements OnInit {
  public sedes: Sedes[] = [];
  public QuiosqueReserva: QuiosqueReserva = new QuiosqueReserva();
  public QuioqueDatas: QuiosqueReservaDatas[];
  public quiosquereserva: QuiosqueReserva[] = [];
  public ReservaVigente: QuiosqueReservaVigente[] = [];
  public error = false;
  public mensagem = "";

  // AutoComplete
  typeaheadLoading: boolean;
  typeaheadNoResults: boolean;
  dataSource: Observable<any>;
  selected: string;
  dataInicio: any;
  sedeNome: string;
  permiteDebito: boolean;
  dateMask = MaskedDate;

  dates: IMyDate[] = [
    { year: 2019, month: 7, day: 24 },
    { year: 2019, month: 7, day: 25 }
  ];

  modalRef: BsModalRef;
  router: any;
  constructor(
    private modalService: BsModalService,
    private sedeServico: SedeService,
    private quiosquesreserva: QuiosqueService,
    private associadosService: AssociadoService,
    private routerNavigate: Router
  ) {
    this.QuiosqueReserva.nomeBeneficiario = "";
    this.dataSource = Observable.create((observer: any) => {
      return this.associadosService
        .getAll(null, this.QuiosqueReserva.nomeBeneficiario, true, null, 1)
        .subscribe((result: any) => {
          observer.next(result.items);
        });
    });
  }

  selectedUnidade(sedeId) {
    this.dates = [];
    this.quiosquesreserva
      .getReservaVigente(sedeId, new Date().toISOString())
      .toPromise()
      .then(c => {
        if (c !== null) {
          const someDate = new Date();
          someDate.setDate(someDate.getDate() + c.qtdDiasReservaAdm);
          this.quiosquesreserva
            .getDatasBloqueadas(
              sedeId,
              new Date().toISOString(),
              someDate.toISOString()
            )
            .toPromise()
            .then(x => {
              x.items.forEach(v => {
                // console.log(new Date(v.data).getFullYear());
                // console.log(new Date(v.data).getDate())
                // tslint:disable-next-line: max-line-length
                this.dates.push({
                  year: new Date(v.data).getFullYear(),
                  month: new Date(v.data).getMonth() + 1,
                  day: new Date(v.data).getDate()
                });
              });
            });
        } else {
          this.QuiosqueReserva.data = new Date();
        }
      });
  }

  getStatesAsObservable(token: string): Observable<any> {
    console.log(token);
    const query = new RegExp(token, "i");

    return of(
      this.associadosService
        .getAll(null, this.QuiosqueReserva.nomeBeneficiario, true, null, 1)
        .toPromise()
        .then(state => {
          return state;
        })
    );
  }

  changeTypeaheadLoading(e: boolean): void {
    this.typeaheadLoading = e;
  }

  typeaheadOnSelect(e: TypeaheadMatch): void {
    this.QuiosqueReserva.nomeBeneficiario = e.item.nome;
    this.QuiosqueReserva.associadoId = e.item.associadoId;
  }

  openModal(template: TemplateRef<any>) {
    // this.routerNavigate.navigate(['/operacional/confirmacao']);
    this.error = false;

    this.sedeServico
      .getAll(this.QuiosqueReserva.sedeId, null, true)
      .toPromise()
      .then(c => {
        this.sedeNome = c[0].titulo;
      });

    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {
    this.QuiosqueReserva.nomeBeneficiario = "";
    this.carregaSedes();

    this.QuiosqueReserva.sedeId = 0;
    this.QuiosqueReserva.qtdPessoas = 0;
  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }

  salvar() {
    this.error = false;
    // tslint:disable-next-line: max-line-length
    this.quiosquesreserva
      .reservar(this.QuiosqueReserva)
      .then(c => {
        this.modalRef.hide();
        this.routerNavigate.navigate(["/operacional/confirmacao"]);
      })
      .catch(x => {
        this.error = true;
        this.mensagem = x.error;
      });
  }
}
