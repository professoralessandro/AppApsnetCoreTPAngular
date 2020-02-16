import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-grupo-categorias-delete',
  templateUrl: './grupo-categorias-delete.component.html',
  styleUrls: ['./grupo-categorias-delete.component.scss']
})
export class GrupoCategoriasDeleteComponent implements OnInit {

  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: CategoriasService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.feedService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.mensagem = `Deseja realmente deletar o registro selecionado?
                          ${x[0].titulo}
                          `;
        });
      }
    });

  }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.feedService.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/grupo-categorias']).then((e) => {
        });
      });
    });
  }
}
