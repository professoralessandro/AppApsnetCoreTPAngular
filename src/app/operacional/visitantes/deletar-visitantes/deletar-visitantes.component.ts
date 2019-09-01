import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitantesService } from 'src/app/services/visitantes.service';
import { Visitantes } from '@app/models/Visitantes';


@Component({
  selector: 'app-deletar-visitantes',
  templateUrl: './deletar-visitantes.component.html',
  styleUrls: ['./deletar-visitantes.component.scss']
})
export class DeletarVisitantesComponent implements OnInit {

  message: String;
  loading = false;
  public visitante = new Visitantes();

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private visitanteServico: VisitantesService,
    
    private routerNavigate: Router) { }

  ngOnInit() {
    this.loading = true;
    this.message = "";
    
    //DESCOMENTAR
    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.visitanteServico.getAll(Number(params.get('id')), null, null).subscribe(x => {
          debugger;
          this.visitante = x[0];
          this.loading = false;
          this.message = x[0].nome;
        });
      }
    });
  }//INIT

  deletar()
  {
    //DESCOMENTAR
    debugger;
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      debugger
      if (params.get('id') != null) {
        this.visitanteServico.delete(params.get('id')).subscribe(c => {
          this.loading = false;
          this.routerNavigate.navigate(['/operacional/visitantes']).then((e) => {
          });
        });
      }
    });//SUBSCRIBE
  }//DELETAR

}//CLASSE
