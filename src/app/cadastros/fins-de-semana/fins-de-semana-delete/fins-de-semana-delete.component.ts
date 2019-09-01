import { Component, OnInit } from '@angular/core';
import { FimDeSemanaService } from 'src/app/services/fim-de-semana.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fins-de-semana-delete',
  templateUrl: './fins-de-semana-delete.component.html',
  styleUrls: ['./fins-de-semana-delete.component.scss']
})
export class FinsDeSemanaDeleteComponent implements OnInit {
  mensagem = 'Deseja realmente deletar o registro selecionado?';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private configQuiosqueService: FimDeSemanaService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.mensagem = `Deseja realmente deletar o registro selecionado?
                          ${x[0].descricao}
                          `;
        });
      }
    });

  }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.configQuiosqueService.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/fins-de-semana']).then((e) => {
        });
      });
    });
  }
}



