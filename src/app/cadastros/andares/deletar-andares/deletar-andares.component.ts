import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AndarService } from 'src/app/services/andar.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-deletar-andares',
  templateUrl: './deletar-andares.component.html',
  styleUrls: ['./deletar-andares.component.scss']
})
export class DeletarAndaresComponent implements OnInit {
  public loading = false;
  mensagem = "";
  constructor(private alertService: AlertService,
              private router: ActivatedRoute,
              private andarServico: AndarService,
              private authService: AuthenticationService,
              private routerNavigate: Router) { }

  ngOnInit() {
    this.loading = true;

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.andarServico.getAll(Number(c.get('id')), null, null, null, '').subscribe(x => {
          this.loading = false;
          this.mensagem = x[0].descricao;
        });
      }
    });
  }

  private handleError() {
    location.href = '/login';
  }
  

  deletar() {
    this.router.paramMap.subscribe(params => {
      this.andarServico.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/andares']).then((e) => {
        });
      });
    });
  }

}
