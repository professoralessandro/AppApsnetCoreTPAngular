import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { BlocoService } from 'src/app/services/bloco.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-deletar-blocos',
  templateUrl: './deletar-blocos.component.html',
  styleUrls: ['./deletar-blocos.component.scss']
})
export class DeletarBlocosComponent implements OnInit {
  public loading = false;
  message: String ;

  constructor(
    //private alertService: AlertService,
    private router: ActivatedRoute,
    private blocoServico: BlocoService,
    private authService: AuthenticationService,
    private routerNavigate: Router) { }

  ngOnInit()
  {
    this.loading = true;

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.blocoServico.getAll(Number(c.get('id')), null, '', true).subscribe(x => {
          this.loading = false;
          this.message = x[0].descricao;
          //alert(JSON.stringify(x[0]));
        });
      }
    });
  }

  private handleError()
  {
    location.href = '/login';
  }

  deletar()
  {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.blocoServico.delete(params.get('id')).subscribe(c => {
        this.loading = false;
        this.routerNavigate.navigate(['/cadastros/blocos']).then((e) => {
        });
      });
    });
  }

}
