import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LocaisReservaService } from 'src/app/services/locais-reserva.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-deletar-locais-reserva',
  templateUrl: './deletar-locais-reserva.component.html',
  styleUrls: ['./deletar-locais-reserva.component.scss']
})
export class DeletarLocaisReservaComponent implements OnInit {
  public loading = false;

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private locaisReservaServico: LocaisReservaService,
    private authService: AuthenticationService,
    private routerNavigate: Router) { }
    private message : String;

    ngOnInit()
    {
      this.loading = true;
      this.message = "";

      this.authService.verificarPermissao('Grupos').then(c => {
      }).catch(this.handleError);
  
      this.router.paramMap.subscribe(c =>
      {
        if (c.get('id') != null)
        {
          this.locaisReservaServico.getAll(Number(c.get('id')), '', true).subscribe(x =>
          {
            this.message = x[0].titulo;
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
      this.locaisReservaServico.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/locais-reserva']).then((e) => {
        });
      });
    });
  }

  private handleError() {
    location.href = '/login';
  }

}
