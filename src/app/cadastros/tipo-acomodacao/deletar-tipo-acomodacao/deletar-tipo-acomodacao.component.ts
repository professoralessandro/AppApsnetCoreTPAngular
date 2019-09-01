import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoAcomodacaoService } from 'src/app/services/tipo-acomodacao.service';

@Component({
  selector: 'app-deletar-tipo-acomodacao',
  templateUrl: './deletar-tipo-acomodacao.component.html',
  styleUrls: ['./deletar-tipo-acomodacao.component.scss']
})
export class DeletarTipoAcomodacaoComponent implements OnInit {
public loading = false;
  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private tipoAcomodacaoServico: TipoAcomodacaoService,
    private routerNavigate: Router) { }
    private message : String;

    ngOnInit()
    {
      this.loading = true;
      this.message = "";
  
      this.router.paramMap.subscribe(c =>
      {
        if (c.get('id') != null)
        {
          this.tipoAcomodacaoServico.getAll(Number(c.get('id')), '', '').subscribe(x =>
          {
            this.message = x[0].descricao;
            this.loading = true;
          });
        }
        else
          this.loading = false;
      });
    }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.tipoAcomodacaoServico.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/tipo-acomodacao']).then((e) => {
        });
      });
    });
  }

}
