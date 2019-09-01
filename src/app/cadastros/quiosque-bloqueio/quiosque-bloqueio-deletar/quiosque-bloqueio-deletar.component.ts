import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuiosqueBloqueioService } from 'src/app/services/quiosque-bloqueio.service';

@Component({
  selector: 'app-quiosque-bloqueio-deletar',
  templateUrl: './quiosque-bloqueio-deletar.component.html',
  styleUrls: ['./quiosque-bloqueio-deletar.component.scss']
})
export class QuiosqueBloqueioDeletarComponent implements OnInit {

  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: QuiosqueBloqueioService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.feedService.getAll(Number(c.get('id')), null, 0).subscribe(x => {
          this.mensagem = `Deseja realmente deletar o registro selecionado?
                          ${x[0].descricao}
                          `;
        });
      }
    });

  }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.feedService.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/quiosque-bloqueio']).then((e) => {
        });
      });
    });
  }
}
