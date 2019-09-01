import { Component, OnInit } from '@angular/core';
import { QuiosqueUnidadeService } from 'src/app/services/quiosque-unidade.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quiosque-unidades-delete',
  templateUrl: './quiosque-unidades-delete.component.html',
  styleUrls: ['./quiosque-unidades-delete.component.scss']
})
export class QuiosqueUnidadesDeleteComponent implements OnInit {
  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private configQuiosqueService: QuiosqueUnidadeService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), 0, null).subscribe(x => {
          this.mensagem = `Deseja realmente deletar o registro selecionado?
                          ${x[0].numeroQuiosque}
                          `;
        });
      }
    });

  }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.configQuiosqueService.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/quiosque-unidade']).then((e) => {
        });
      });
    });
  }
}

