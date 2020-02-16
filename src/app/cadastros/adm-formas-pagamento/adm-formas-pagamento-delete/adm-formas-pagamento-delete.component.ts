import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormasPagamentoService } from 'src/app/services/formas-pagamento.service';

@Component({
  selector: 'app-adm-formas-pagamento-delete',
  templateUrl: './adm-formas-pagamento-delete.component.html',
  styleUrls: ['./adm-formas-pagamento-delete.component.scss']
})
export class AdmFormasPagamentoDeleteComponent implements OnInit {
  mensagem = '';
  temErro = false;

  constructor(
    private router: ActivatedRoute,
    private configQuiosqueService: FormasPagamentoService,
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
      this.configQuiosqueService.delete(Number(params.get('id'))).toPromise().then(c => {
        this.routerNavigate.navigate(['/cadastros/adm-formas-pagamento']).then((e) => {
        });
      }).catch(c => {
        this.mensagem = c.error;
        this.temErro = true;        
      });
    });
  }
}

  

