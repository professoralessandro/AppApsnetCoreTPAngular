import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaisAcessoService } from 'src/app/services/locais-acesso.service';

@Component({
  selector: 'app-deletar-local-acesso',
  templateUrl: './deletar-local-acesso.component.html',
  styleUrls: ['./deletar-local-acesso.component.scss']
})
export class DeletarLocalAcessoComponent implements OnInit {
  public loading = true;

constructor(
  private alertService: AlertService,
  private router: ActivatedRoute,
  private locaisAcessoServico: LocaisAcessoService,
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
        this.locaisAcessoServico.getAll(Number(c.get('id')), null, '', true, ).subscribe(x =>
        {
          this.loading = true;
          this.message = x[0].descricao;
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
      this.locaisAcessoServico.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/locais-acesso']).then((e) => {
        });
      });
    });
  }

}
