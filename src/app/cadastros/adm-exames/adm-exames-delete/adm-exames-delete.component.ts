import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamesService } from 'src/app/services/exames.service';

@Component({
  selector: 'app-adm-exames-delete',
  templateUrl: './adm-exames-delete.component.html',
  styleUrls: ['./adm-exames-delete.component.scss']
})
export class AdmExamesDeleteComponent implements OnInit {

  mensagem = '';
  public loading = false;
  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: ExamesService,
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
        this.routerNavigate.navigate(['/cadastros/adm-exames']).then((e) => {
        });
      });
    });
  }
}
