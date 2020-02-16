import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BloqueioFrequentadoresService } from 'src/app/services/bloqueioFrequentadores.service';
import { BloqueioFrequentadores } from '@app/models/BloqueioFrequentadores';

@Component({
  selector: 'app-deletar-bloqueio-frequentadores',
  templateUrl: './deletar-bloqueio-frequentadores.component.html',
  styleUrls: ['./deletar-bloqueio-frequentadores.component.sass']
})
export class DeletarBloqueioFrequentadoresComponent implements OnInit {

  //VERIFICADORES
  message: String;
  loading = false;
  public bloqueioFrequentadores = new BloqueioFrequentadores();

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private bloqueioFrequentadoresService: BloqueioFrequentadoresService,
    
    private routerNavigate: Router) { }//CONSTRUTOR

  ngOnInit()
  {
    this.loading = true;
    this.message = "";

    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.bloqueioFrequentadoresService.getAllWithParameter(Number(params.get('id'))).subscribe(x => {
          debugger;
          this.bloqueioFrequentadores = x[0];
          this.loading = false;
          this.message = x[0].nome;
        });
      }
    });
  }//ONINIT

  deletar()
  {
    //DESCOMENTAR
    debugger;
    this.loading = true;
    this.router.paramMap.subscribe(params => {
      debugger
      if (params.get('id') != null) {
        this.bloqueioFrequentadoresService.delete(params.get('id')).subscribe(c => {
          this.loading = false;
          this.routerNavigate.navigate(['/operacional/bloqueio-frequentadores']).then((e) => {
          });
        });
      }
    });//SUBSCRIBE
  }//DELETAR


}//CLASS
