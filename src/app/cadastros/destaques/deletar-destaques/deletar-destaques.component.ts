import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedService } from 'src/app/services/feed.service';

@Component({
  selector: 'app-deletar-destaques',
  templateUrl: './deletar-destaques.component.html',
  styleUrls: ['./deletar-destaques.component.scss']
})
export class DeletarDestaquesComponent implements OnInit {
  public loading = false;
  mensagem = '';

  constructor(
    // private alertService: AlertService,
    private router: ActivatedRoute,
    private feedService: FeedService,
    private routerNavigate: Router) { }


  ngOnInit() {
    this.loading = true;
    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.feedService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.loading = false;
          this.mensagem = x[0].titulo;
        });
      }
    });

  }

  deletar()
  {
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      this.feedService.delete(Number(params.get('id'))).subscribe(c => {
        this.loading = false;
        this.routerNavigate.navigate(['/cadastros/destaques']).then((e) => {
        });
      });
    });
  }
}
