import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaLocaisReservaService } from 'src/app/services/categoria-locais-reserva.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-deletar-categoria',
  templateUrl: './deletar-categoria.component.html',
  styleUrls: ['./deletar-categoria.component.scss']
})
export class DeletarCategoriaComponent implements OnInit {
  public loading = false;

  constructor(
    private alertService: AlertService,
    private authService: AuthenticationService,
    private router: ActivatedRoute,
    private categoriaServico: CategoriaLocaisReservaService,
    private routerNavigate: Router) { }

  private message: String;

  ngOnInit() {
    this.loading = true;
    this.message = "";

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.categoriaServico.getAll(Number(c.get('id')), '', true).subscribe(x => {
          this.loading = false;
          this.message = x[0].titulo;
        });
      }
      else
      {
        this.loading = false;
      }
    });
  }

  private handleError() {
    location.href = '/login';
  }

  deletar()
  {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.categoriaServico.delete(params.get('id')).subscribe(c => {
        this.loading = false;
        this.routerNavigate.navigate(['/cadastros/categoria-locais-reserva']).then((e) => {
        });
      });
    });
  }

}
