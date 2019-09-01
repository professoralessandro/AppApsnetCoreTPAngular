import { Component, OnInit } from '@angular/core';
import { Exames } from 'src/app/models/Exames';
import { ExamesService } from 'src/app/services/exames.service';
import { CommonService } from 'src/app/services/common.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-adm-exames-cadastro',
  templateUrl: './adm-exames-cadastro.component.html',
  styleUrls: ['./adm-exames-cadastro.component.scss']
})
export class AdmExamesCadastroComponent implements OnInit {
  public loading = false;
  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public exame: Exames = new Exames();
  success = false;
  error = false;
  mensagem = '';

  constructor(
    private quiosqueService: ExamesService,
    private comonService: CommonService,
    private router: ActivatedRoute,
    private commomService: CommonService
  ) { }

  ngOnInit() {
    this.exame.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.quiosqueService.getAll(Number(c.get('id')), null, null).toPromise().then(x => {
          this.exame = x[0];

          this.isNew = false;
        })

      } else {

      }
    });
  }

  isValid() {
    return true;
  }

  Mascara() {
    this.commomService.MascaraData(document.getElementById('txtdataValidadeDe'));
    this.commomService.MascaraData(document.getElementById('txtdataValidadeAte'));
  }

  salvar() {
    this.success = false;
    this.mensagem = '';
    this.error = false;
    this.loading = true;

    if (!this.isValid()) {
      this.error = true;
      this.mensagem = 'Preencha todos os campos em amarelo.';
      return;
    }

    if (this.isNew) {
      this.quiosqueService.insert(this.exame).then(c => {
        this.success = true;
        this.loading = false;
        this.mensagem = 'Registro inserido com sucesso.';
        this.quiosqueService.getAll(c.exameId, null, null).subscribe(x => {
          this.exame = x[0];

          this.isNew = false;
        });
      }).catch(c => {
        this.error = true;
        this.loading = false;
        this.mensagem = c.error;
      })

    } else {

      this.quiosqueService.edit(this.exame).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
      });

    }
  }
}
