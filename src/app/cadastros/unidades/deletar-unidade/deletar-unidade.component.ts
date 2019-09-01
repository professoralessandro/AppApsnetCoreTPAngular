/*
import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-deletar-unidade',
  templateUrl: './deletar-unidade.component.html',
  styleUrls: ['./deletar-unidade.component.scss']
})
export class DeletarUnidadeComponent implements OnInit {

  message: String ;

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private sedeServico: SedeService,
    private routerNavigate: Router) { }

  ngOnInit() {
    this.message = "";


    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        this.sedeServico.getAll(Number(params.get('id')), null, '').subscribe(x => {

          this.message = x[0].titulo;
          // alert(JSON.stringify(x));

      });



  }
});
  }

  deletar() {

    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {


      this.sedeServico.delete(params.get('id')).subscribe(c => {
        this.routerNavigate.navigate(['/cadastros/unidades']).then((e) => {
        });
      });

  }
});
  }
}
*/
