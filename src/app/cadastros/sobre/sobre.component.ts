import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { SobreService } from 'src/app/services/sobre.service';
import { Sobre } from 'src/app/models/Sobre';
import { ImagemService } from 'src/app/services/imagem.service';
import { isUndefined } from 'util';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss']
})
export class SobreComponent implements OnInit {
  public loading = false;
  public sobre: Sobre = new Sobre();
  file: any;
  imagem: string;
  isNew = true;
  success = false;
  error = false;
  mensagem = '';

  public Editor1 = ClassicEditor;

  constructor(private sobreServico: SobreService,
    private authService: AuthenticationService,
// tslint:disable-next-line: align
    private imagemService: ImagemService) { }

  

  ngOnInit() {
    this.loading = true;
    this.sobre.descricao = '';

    this.authService.verificarPermissao('Grupos').then(c => { 
    }).catch(this.handleError);

    this.sobreServico.getSobre().subscribe(c => {
      if (!isUndefined(c) && c !== null) {
        this.sobre = c;

        this.imagemService.getPathRead('ImagensSobreLeitura', this.sobre.imagem).subscribe(z => {
          this.imagem = z.toString();
        });

        this.loading = false;
        this.isNew = false;
      }
    });
  }

  private handleError() {
    location.href = '/login';
  }

  onSelectFile(f, event) {
    this.file = f;

    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.imagem = myReader.result.toString();
    };

    myReader.readAsDataURL(file);
  }

  isValid() {
    return true;
  }

  salvar()
  {
    this.loading = true;
    this.success = false;
    this.mensagem = '';
    this.error = false;

    if (!this.isValid()) {
      this.error = true;
      this.loading = false;
      this.mensagem = 'Preencha todos os campos em amarelo.';
      return;
    }

    if (this.isNew)
    {

      if (isUndefined(this.file)) {
        return;
      }

      const formData = new FormData();

      for (const f of this.file) {
        formData.append(f.name, f);
      }

      this.imagemService.saveImage('ImagensSobreGravacao', formData).subscribe(imagens => {
        this.sobre.imagem = imagens[0];

        this.sobreServico.insert(this.sobre).subscribe(c => {
          this.loading = false;
          this.success = true;
          this.mensagem = ('Registro inserido com sucesso.');
        });
      });
    } else {
      if (isUndefined(this.file)) {
        this.sobreServico.edit(this.sobre).subscribe(c => {
          this.loading = false;
          this.success = true;
          this.mensagem = ('Registro atualizado com sucesso.');
        });
      } else {
        const formData = new FormData();

        for (const f of this.file) {
          formData.append(f.name, f);
        }

        this.imagemService.saveImage('ImagensFeedGravacao', formData).subscribe(imagens => {

          this.sobre.imagem = imagens[0];

          this.sobreServico.edit(this.sobre).subscribe(c => {
            this.loading = false;
            this.success = true;
            this.mensagem = ('Registro atualizado com sucesso.');
          });
        });
      }
    }
  }

}
