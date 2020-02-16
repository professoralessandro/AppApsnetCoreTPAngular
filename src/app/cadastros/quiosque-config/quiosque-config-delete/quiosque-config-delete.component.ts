import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuiosqueConfigService } from 'src/app/services/quiosque-config.service';

@Component({
  selector: 'app-quiosque-config-delete',
  templateUrl: './quiosque-config-delete.component.html',
  styleUrls: ['./quiosque-config-delete.component.scss']
})
export class QuiosqueConfigDeleteComponent implements OnInit {

  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private configQuiosqueService: QuiosqueConfigService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.configQuiosqueService.getAll(Number(c.get('id')), null, 0, null).subscribe(x => {
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
        this.routerNavigate.navigate(['/cadastros/quiosque-config']).then((e) => {
        });
      });
    });
  }
}

