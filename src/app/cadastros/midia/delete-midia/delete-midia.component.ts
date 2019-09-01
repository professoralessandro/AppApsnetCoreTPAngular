import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositorioMidiasService } from 'src/app/services/repositorio-midias.service';

@Component({
  selector: 'app-delete-midia',
  templateUrl: './delete-midia.component.html',
  styleUrls: ['./delete-midia.component.scss']
})
export class DeleteMidiaComponent implements OnInit {
  public loading = false;
  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: RepositorioMidiasService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.loading = true;
    this.router.paramMap.subscribe(c => {
      this.loading = false;
      if (c.get('id') != null) {
        this.feedService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.mensagem = x[0].descricao;
        });
      }
    });

  }

  deletar()
  {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.loading = false;
      this.feedService.delete(Number(params.get('id'))).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/midia']).then((e) => {
        });
      });
    });
  }
}
