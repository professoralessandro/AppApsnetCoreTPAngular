import { Component, OnInit } from '@angular/core';
import { FeriadosService } from 'src/app/services/feriados.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-adm-feriados-delete',
  templateUrl: './adm-feriados-delete.component.html',
  styleUrls: ['./adm-feriados-delete.component.scss']
})
export class AdmFeriadosDeleteComponent implements OnInit {
  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private configQuiosqueService: FeriadosService,
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
        this.routerNavigate.navigate(['/cadastros/adm-feriados']).then((e) => {
        });
      });
    });
  }
}

  

