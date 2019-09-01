import { Component, OnInit } from '@angular/core';
import { BlocoService } from 'src/app/services/bloco.service';
import { SedeService } from 'src/app/services/sede.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { Sedes } from 'src/app/models/Sedes';
import { Blocos } from 'src/app/models/Blocos';

@Component({
  selector: 'app-cadastro-blocos',
  templateUrl: './cadastro-blocos.component.html',
  styleUrls: ['./cadastro-blocos.component.scss']
})
export class CadastroBlocosComponent implements OnInit {
  public sedes: Sedes[] = [];
  public blocos: Blocos = new Blocos ();
  isNew = true;
  success = false;
  mensagem = "";

  constructor(private blocoServico: BlocoService,
              private blocoService: BlocoService,
              private sedeServico: SedeService,
              private router: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    this.blocos.sedeId = '';
    this.blocos.ativo = true;
    this.success = false;
    this.mensagem = "";
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.blocoServico.getAll(Number(c.get('id')), null, null, null).subscribe(x => {
          this.blocos = x[0];         
          this.isNew = false;
        });
        this.carregaSedes();
      }      
    });

   

  }

  carregaSedes() {
    this.sedeServico.getAll(null, null, true).subscribe(c => {
      this.sedes = c;
    });
  }

  cadastrarBloco() {
    this.success = false;
    this.mensagem = "";
    if (this.isNew) {
      this.blocoService.insert(this.blocos).subscribe(c => {
        this.success = true;
        this.mensagem = ('Registro inserido com sucesso.');
      });
    } else {
      this.blocoService.edit(this.blocos).subscribe(c => {
        this.success = true;

        this.mensagem = ('Registro atualizado com sucesso.');
      });
    }
  }

}
