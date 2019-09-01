import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { LocaisReservaService } from 'src/app/services/locais-reserva.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { LocaisReserva } from 'src/app/models/LocaisReserva';
import { CategoriaLocaisReservaComponent } from '../../categoria-locais-reserva/categoria-locais-reserva.component';
import { CategoriaLocaisReservaService } from 'src/app/services/categoria-locais-reserva.service';
import { LocaisReservaCategorias } from 'src/app/models/LocaisReservaCategorias';
import { API_URL } from 'src/environments/API_URL';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { DomSanitizer, disableDebugTools } from '@angular/platform-browser';
import { isUndefined } from 'util';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cadastro-locais-reserva',
  templateUrl: './cadastro-locais-reserva.component.html',
  styleUrls: ['./cadastro-locais-reserva.component.scss']
})
export class CadastroLocaisReservaComponent implements OnInit {
  locaisReserva: LocaisReserva = new LocaisReserva();

  public categorias: LocaisReservaCategorias[] = [];
  isNew = true;

  constructor(
    private locaisReservaServico: LocaisReservaService,
    private categoriaService: CategoriaLocaisReservaService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private http: HttpClient,
    private _sanitizer:DomSanitizer,
    private commonService: CommonService
  ) { }

  public Editor = ClassicEditor;
  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };

  ngOnInit() {
    this.locaisReserva.ativo = true;
    this.locaisReserva.descricao = '';
    this.locaisReserva.imagem = '';
    this.isNew = true;

    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.locaisReservaServico.getAll(Number(c.get('id')), '', true).subscribe(x => {
          this.locaisReserva = x[0];
          this.carregaCategorias();
          this.isNew = false;
          this.imagem = `data:image/png;base64, ` + this.locaisReserva.imagem;
        });        
      }
    });

    
  }

  public imagem: string;
  public required: boolean;
  public success: boolean;
  public erro: boolean;
  public mensagem: string;
  public selected: number;

  Imagem() 
  {
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

    if(isUndefined(this.locaisReserva.localReservaCategoriaId) || this.locaisReserva.localReservaCategoriaId == -1){
      this.required = true;
      this.mensagem += `Selecione uma categoria.\n`;
  }

    if(isUndefined(this.locaisReserva.titulo) || this.locaisReserva.titulo.trim() == '')
    {
      this.required = true;
      this.mensagem += `Informe um título.\n`;
    }

    if(isUndefined(this.locaisReserva.descricao) || this.locaisReserva.descricao.trim() == '')
    {
      this.required = true;
      this.mensagem += `Informe uma descrição.\n`;
    }

    if(!this.required){
      return true;
    }
    else{
      //this.alertService.success(e);
      return false;
    }  
  }

  upload(files) {
    //debugger;

    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);


    let strRequest: string = `${API_URL}/api/upload`; 
    if(this.locaisReserva.localReservaId != null)
    {
        strRequest = `${API_URL}/api/upload?id=` + this.locaisReserva.localReservaId;
    }


    const uploadReq = new HttpRequest('POST', strRequest, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.Response)
      {           
        this.imagem = `data:image/png;base64, ` + event.body[0].toString();        
      }
    });
  }

  cadastrarLocalReserva() {
    let imgLocaisReserva: any = document.getElementById('imgLocaisReserva');
    let localReservaCategoria: any = document.getElementById('localReservaCategoria');

    if(!isUndefined(imgLocaisReserva) && imgLocaisReserva != null)
    {
      this.locaisReserva.imagem = imgLocaisReserva.src;
    }

    this.locaisReserva.localReservaCategoriaId = localReservaCategoria.value;

    if(this.Validar())
    {
      if (this.isNew) {
        this.locaisReservaServico.insert(this.locaisReserva).subscribe(c => {
          this.mensagem = `Registro inserido com sucesso.`;
          this.success = true;
          this.isNew = false;

          this.locaisReserva.localReservaId = c.localReservaId;
        },
        error => {
          this.erro = true;
          this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
        });
      } else {
        this.locaisReservaServico.edit(this.locaisReserva).subscribe(c => {
          this.mensagem = `Registro atualizado com sucesso.`;
          this.success = true;

          this.locaisReserva.localReservaId = c.localReservaId;
        },
        error => {
          this.erro = true;
          this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
        });
      }      
    }
  }

  carregaCategorias() {
    this.categoriaService.getAll(null, '', true).subscribe(c => {
      this.categorias = c;

      let selecione: LocaisReservaCategorias = new LocaisReservaCategorias();
      selecione.ativo = true;
      selecione.localReservaCategoriaId = -1;
      selecione.titulo = "Selecione...";

      this.categorias.splice(0, 0, selecione);
     
      let localReservaCategoriaId: number = this.locaisReserva.localReservaCategoriaId;     

      if(!isUndefined(localReservaCategoriaId)){       
        this.selected = localReservaCategoriaId;
      }
      else{
        this.selected = -1;  
      }

    });
  }
}
