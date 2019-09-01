import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoItensService } from 'src/app/services/tipo-itens.service';

@Component({
  selector: 'app-tipo-itens-delete',
  templateUrl: './tipo-itens-delete.component.html',
  styleUrls: ['./tipo-itens-delete.component.scss']
})
export class TipoItensDeleteComponent implements OnInit {

  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: TipoItensService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.feedService.getAll(Number(c.get('id')), null, null).subscribe(x => {
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
        this.routerNavigate.navigate(['/cadastros/tipo-itens']).then((e) => {
        });
      });
    });
  }
}
