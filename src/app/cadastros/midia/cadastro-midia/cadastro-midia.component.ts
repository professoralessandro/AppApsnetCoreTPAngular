import { Component, OnInit } from '@angular/core';
import { ImagemService } from 'src/app/services/imagem.service';
import { RepositorioMidiasService } from 'src/app/services/repositorio-midias.service';
import { CommonService } from 'src/app/services/common.service';
import { RepositorioMidias } from 'src/app/models/RepositorioMidias';
import { isUndefined } from 'util';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray } from '@angular/forms';
import { RepositorioMidiaMidias } from 'src/app/models/RepositorioMidiaMidias';

@Component({
  selector: 'app-cadastro-midia',
  templateUrl: './cadastro-midia.component.html',
  styleUrls: ['./cadastro-midia.component.scss']
})
export class CadastroMidiaComponent implements OnInit {

  public loading = false;
  idsSelecionados: string[] = [];
  file: any;
  imagem = '';
  isNew = true;
  public imagens: RepositorioMidiaMidias[] = [];
  public repositorioMidiaLista: RepositorioMidias[] = [];

  public repositorioMidias: RepositorioMidias = new RepositorioMidias();
  success = false;
  error = false;
  mensagem = '';
  public parametroLeitura = '';

  constructor(
    private imagemService: ImagemService,
    private repositorioMidiaService: RepositorioMidiasService,
    private comonService: CommonService,
    private router: ActivatedRoute,
    private routerNavigate: Router,
  ) { }

  ngOnInit() {
    this.loading = true;
    this.imagemService.getParameter('ImagenRepositorioGaleriaLeitura').subscribe(c => {
      this.parametroLeitura = c;
    });

    this.repositorioMidias.ativo = true;
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      this.loading = false;
      if (c.get('id') != null) {
        this.repositorioMidiaService.getAll(Number(c.get('id')), null, null).subscribe(x => {
          this.repositorioMidias = x[0];

          this.isNew = false;

          this.buscarImagens();
        });
      }
    });
  }

  buscarImagens() {
    this.loading = true;
    this.imagens = [];

    this.repositorioMidiaService.findAllImage(this.repositorioMidias.repositorioMidiaId).subscribe(c => {
      this.loading = false;
      this.imagens = c;
    });
  }

  onSelectFile(f, event) {
    this.file = f;
  }

  isValid() {
    return true;
  }

  selecionar(event: any) {
    if (this.idsSelecionados.indexOf(event.target.id) === -1) {
      this.idsSelecionados.push(event.target.id);
    } else {
      this.idsSelecionados.splice(this.idsSelecionados.indexOf(event.target.id), 1);
    }
  }

  removerImagens() {
    this.loading = true;
    this.success = false;
    this.error = false;

    this.idsSelecionados.forEach(x => {
      this.repositorioMidiaService.removeImage(Number(x)).subscribe(c => {
        this.success = true;
        this.mensagem = 'Imagens removidas com sucesso.';
        this.loading = false;
        this.buscarImagens();
        this.idsSelecionados = [];
      });
    });
  }

  enviarImagens() {
    this.loading = true;
    this.success = false;
    this.error = false;

    if (isUndefined(this.file)) {
      this.loading = false;
      return;
    }

    const formData = new FormData();

    for (const f of this.file) {
      formData.append(f.name, f);
    }

    const fd = new FormData();

    this.imagemService.saveImage('ImagenRepositorioGaleriaGravacao', formData).toPromise().then(x => {
      const promise = new Promise((resolve, reject) => {
        this.repositorioMidiaService.saveImage(this.repositorioMidias.repositorioMidiaId, x).subscribe(
          x => {
            this.loading = false;
            this.buscarImagens();
            this.idsSelecionados = [];

            this.success = true;
            this.mensagem = 'Imagem adicionado com sucesso.';
          }
        );
      })
    });

    // .subscribe(c => {

    //   const fd: FormData = new FormData();

    //   this.repositorioMidiaService.saveImage(this.repositorioMidias.repositorioMidiaId, fd).subscribe(
    //     x => {
    //       console.log(x);
    //     }
    //   );
    // });
  }

  salvar() {
    this.loading = true;
    this.success = false;
    this.mensagem = '';
    this.error = false;

    if (!this.isValid()) {
      this.loading = false;
      this.error = true;
      this.mensagem = 'Preencha todos os campos em amarelo.';
      return;
    }

    if (this.isNew) {

      this.repositorioMidiaService.insert(this.repositorioMidias).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = ('Registro inserido com sucesso.');
      });

    } else {

      this.repositorioMidiaService.edit(this.repositorioMidias).subscribe(c => {
        this.loading = false;
        this.success = true;
        this.mensagem = ('Registro atualizado com sucesso.');
      });

    }
  }
}
