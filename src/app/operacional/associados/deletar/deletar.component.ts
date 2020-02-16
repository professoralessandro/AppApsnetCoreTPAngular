import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SedeService } from 'src/app/services/sede.service';
import { AssociadoService } from '@app/services/associados.service';

@Component({
  selector: 'app-deletar',
  templateUrl: './deletar.component.html',
  styleUrls: ['./deletar.component.scss']
})
export class DeletarComponent implements OnInit {

  message: String;

  constructor(
    private alertService: AlertService,
    private router: ActivatedRoute,
    private associadoService: AssociadoService,
    private routerNavigate: Router) { }

  ngOnInit() {
    this.message = "";


    //  this.router.paramMap.subscribe(params => {
    //     if (params.get('id') != null) {
    //        this.associadoService.getAll(String(params.get('funcional')), null, '').subscribe(x => {
    //          this.message = x[0].Nome;
    //        });
    //      }
    // });

  }

  deletar() {
    this.router.paramMap.subscribe(params => {
      if (params.get('id') != null) {
        let id = params.get('id')
        console.log("AQUI ID:", id);


        this.associadoService.delete(id).subscribe(c => {
          this.routerNavigate.navigate(['/operacional/associados']).then((e) => {
          });
        });

      }
    });
  }

}



