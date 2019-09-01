import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ItensLocacaoService } from 'src/app/services/itens-locacao.service';

@Component({
  selector: 'app-itens-locacao-delete',
  templateUrl: './itens-locacao-delete.component.html',
  styleUrls: ['./itens-locacao-delete.component.scss']
})
export class ItensLocacaoDeleteComponent implements OnInit {

  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: ItensLocacaoService,
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
        this.routerNavigate.navigate(['/cadastros/itens-locacao']).then((e) => {
        });
      });
    });
  }
}
