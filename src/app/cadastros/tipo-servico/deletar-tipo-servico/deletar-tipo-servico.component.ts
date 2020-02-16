import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TipoServicoService } from 'src/app/services/tipo-servico.service';

@Component({
  selector: 'app-deletar-tipo-servico',
  templateUrl: './deletar-tipo-servico.component.html',
  styleUrls: ['./deletar-tipo-servico.component.scss']
})
export class DeletarTipoServicoComponent implements OnInit {
  public loading = false;

  constructor(
    private router: ActivatedRoute,
    private tipoServicoServ: TipoServicoService,
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
          this.tipoServicoServ.getAll(Number(c.get('id')), '', '').subscribe(x =>
          {
            this.message = x[0].descricao;
            this.loading = false;
          });
        }
        else
        {
          this.loading = false;
        }
      });
    }

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.tipoServicoServ.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/tipo-servico']).then((e) => {
        });
      });
    });
  }

}
