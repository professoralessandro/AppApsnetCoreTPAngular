import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LocaisReservaCategorias } from 'src/app/models/LocaisReservaCategorias';
import { CategoriaLocaisReservaService } from 'src/app/services/categoria-locais-reserva.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { isUndefined } from 'util';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { DomSanitizer, disableDebugTools } from '@angular/platform-browser';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { CommonService } from 'src/app/services/common.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-cadastro-categoria-locais-reserva',
  templateUrl: './cadastro-categoria-locais-reserva.component.html',
  styleUrls: ['./cadastro-categoria-locais-reserva.component.scss']
})
export class CadastroCategoriaLocaisReservaComponent implements OnInit {
  public loading = false;
  public categorias: LocaisReservaCategorias = new LocaisReservaCategorias();
  isNew = true;

  constructor(
    private categoriaServico: CategoriaLocaisReservaService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private http: HttpClient,
    private _sanitizer:DomSanitizer,
    private authService: AuthenticationService,
    private commonService: CommonService

  ) { }

  public Editor = ClassicEditor;
  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };

  ngOnInit()
  {
    this.loading = true;
    this.categorias.titulo = '';
    this.categorias.descricao = '';
    this.categorias.descricaoPortal = '';
    this.categorias.imagem = '';
    this.categorias.ativo = true;
    this.categorias.urlReserva = '';

    this.authService.verificarPermissao('Grupos').then(c => {
    }).catch(this.handleError);

    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.categoriaServico.getAll(Number(c.get('id')), '', true).subscribe(x => {
          this.loading = false;
          this.categorias = x[0];
          this.isNew = false;
          this.imagem = `data:image/png;base64, ` + this.categorias.imagem;
        });
      }
      else
      {
        this.loading = false;
      }
    });

  }

  private handleError() {
    location.href = '/login';
  }

  public imagem: string;
  public required: boolean;
  public success: boolean;
  public erro: boolean;
  public mensagem: string;
  public selected: number;


  upload(files) {
    debugger;

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    let strRequest: string = `${API_URL}/api/upload`; 
    if(this.categorias.localReservaCategoriaId != null)
    {
        strRequest = `${API_URL}/api/upload?id=` + this.categorias.localReservaCategoriaId;
    }

    const uploadReq = new HttpRequest('POST', strRequest, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.Response)
      {
        debugger;
        this.imagem = `data:image/png;base64, ` + event.body[0].toString();        
      }
    });
  }

  Imagem()
  {
    debugger;
    if(isUndefined(this.imagem) || this.imagem == '' || this.imagem == `data:image/png;base64, `)
    {
      return false;
    }
    else
    {
      return true;
    }
  }


  Validar()
  {
    this.required = false;
    this.success = false;
    this.erro = false;
    this.mensagem = '';

    if(isUndefined(this.categorias.titulo) || this.categorias.titulo.trim() == '')
    {
      this.required = true;
      this.mensagem += `Informe um título.\n`;
    }

    if(isUndefined(this.categorias.descricaoPortal) || this.categorias.descricaoPortal.trim() == '')
    {
      this.required = true;
      this.mensagem += `Informe uma descrição.\n`;
    }

    if(!this.required){
      return true;
    }
    else{
      return false;
    }  
  }

  cadastrarCategoriaReserva()
  {

    this.loading = true;

    let imgLocaisReserva: any = document.getElementById('imgLocaisReserva');

    if(!isUndefined(imgLocaisReserva) && imgLocaisReserva != null)
    {
      this.categorias.imagem = imgLocaisReserva.src;
    }

    if(this.Validar())
    {
      if (this.isNew) {
        this.categoriaServico.insert(this.categorias).subscribe(c => {
          this.loading = false;
          this.mensagem = `Registro inserido com sucesso.`;
          this.success = true;
          this.isNew = false;

          this.categorias.localReservaCategoriaId = c.localReservaCategoriaId;
        },
        error => {
          this.loading = false;
          this.erro = true;
          this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
        });
      } else {
        this.categoriaServico.edit(this.categorias).subscribe(c => {
          this.loading = false;
          this.mensagem = `Registro atualizado com sucesso.`;
          this.success = true;

          this.categorias.localReservaCategoriaId = c.localReservaCategoriaId;
        },
        error => {
          this.loading = false;
          this.erro = true;
          this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
        });
      }
    }
    else
    {
      this.loading = false;
    }
  }

}
