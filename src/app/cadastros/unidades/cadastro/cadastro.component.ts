/*
import { Component, OnInit, TemplateRef } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Sedes } from 'src/app/models/Sedes';
import { SedeService } from 'src/app/services/sede.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/_resources/_components/alert/alert.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { SedeEmails } from 'src/app/models/SedeEmails';
import { SedeEmailsService } from 'src/app/services/sede-emails.service';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { API_URL } from 'src/environments/API_URL';
import { DomSanitizer, disableDebugTools } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormControl, Validators } from '@angular/forms';
import { stringify } from '@angular/core/src/render3/util';
import { SedeImagens } from 'src/app/models/SedeImagens';
import { debug, isUndefined } from 'util';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  public loading = false;
  public sede: Sedes = new Sedes();
  public sedeEmails: SedeEmails = new SedeEmails();
  public lstSedeEmails: SedeEmails[] = [];
  public lstSedeImagens: SedeImagens[] = [];
  permissions: Permissions = new Permissions();


  isNewSedeEmail = true;
  isNew = true;
  modalRef: BsModalRef;
  modalRefDel: BsModalRef;

  public Editor = ClassicEditor;

  config = {
    uiColor: '#F0F3F4',
    height: '100%'
  };

  constructor(
    private sedeServico: SedeService,
    private router: ActivatedRoute,
    private alertService: AlertService,
    private modalService: BsModalService,
    private authService: AuthenticationService,
    private sedeEmailsService: SedeEmailsService,
    private http: HttpClient,
    private _sanitizer: DomSanitizer,
    private commonService: CommonService) { }

  ngOnInit() {
    this.loading = true;
    this.sede.titulo = '';
    this.sede.descricao = '';
    this.sede.imagem = '';
    this.sede.ativo = true;
    this.success = false;
    this.isNew = true;

    this.authService.verificarPermissao('Grupos').then(c => { 
      this.permissions.btnCadastrar = c;
    }).catch(this.handleError);


    this.router.paramMap.subscribe(c => {
      if (c.get('id') != null) {
        this.sedeServico.getAll(Number(c.get('id')), null, '').subscribe(x => {
          this.loading = false;
          this.sede = x[0];
          this.isNew = false;
          this.imagem = `data:image/png;base64, ` + this.sede.imagem;


          this.carregarSedeEmails();
          this.ListarSedesImagens();
        });
      }
      else
      {
        this.loading = false;
      }
    });
  }

  public isLoading()
  {
    this.loading = true;
  }

  private handleError() {
    location.href = '/login';
  }

  public exibeGaleria: boolean = false;
  public exibeFormulario: boolean = true;
  public progress: number;
  public message: string;
  public imagem: string;
  public required: boolean;
  public success: boolean;
  public erro: boolean;
  public exibirDestinatarios: boolean = false;
  public mensagem: string;
  public novaImagemGaleria: any;
  public lstImagensGaleria: string[] = [];
  public lstImagensGaleriaRemocao: string[] = [];
  public lstImagensRemovidas: string[] = [];

  RemoverFotosSelecionadas() {

    if (this.lstImagensGaleriaRemocao.length > 0) {
      let sedeImagensId: string = '';
      for (var i = 0; i < this.lstImagensGaleriaRemocao.length; i++) {
        sedeImagensId += this.lstImagensGaleriaRemocao[i] + '|';
      }

      debugger;

      this.sedeServico.deleteImagens(sedeImagensId).subscribe(c => {
        this.lstImagensRemovidas = c;
        debugger;

        if (this.lstImagensRemovidas != null && this.lstImagensRemovidas != undefined && this.lstImagensRemovidas.length > 0) {
          this.lstImagensGaleriaRemocao = [];
        }

        for (var i = 0; i < this.lstImagensRemovidas.length; i++) {
          for (var j = 0; j < this.lstSedeImagens.length; j++) {
            if (this.lstSedeImagens[j].sedeImagemId.toString() == this.lstImagensRemovidas[i]) {
              this.lstSedeImagens.splice(j, 1);
            }
          }
        }
      });
    }
    else {
      alert(`Selecione as fotos que deseja remover.`);
    }
  }

  SelecionaFotosRemocao(sedeImagemId: string) {
    let index: number = this.lstImagensGaleriaRemocao.indexOf(sedeImagemId, 0);

    if (index > -1) {
      this.lstImagensGaleriaRemocao.splice(index, 1);
    }
    else {
      this.lstImagensGaleriaRemocao.push(sedeImagemId);
    }

    debugger;
  }

  Imagem() {
    if (isUndefined(this.imagem) || this.imagem == '' || this.imagem == `data:image/png;base64, `) {
      return false;
    }
    else {
      return true;
    }
  }

  exibirGaleria()
  {
    this.loading = true;
    this.Galeria();

    if (this.exibeGaleria) {
      this.exibeGaleria = false;
      this.exibeFormulario = true;
    }
    else {
      this.exibeGaleria = true;
      this.exibeFormulario = false;
    }
  }

  ListarSedesImagens() {
    this.sedeServico.listImagens(this.sede.sedeId).subscribe(lstImagens => {
      this.lstSedeImagens = lstImagens.reverse();

      for (var i = 0; i < this.lstSedeImagens.length; i++) {
        this.lstSedeImagens[i].imagem = `data:image/png;base64, ` + this.lstSedeImagens[i].imagem;
      }
    });
  }

  Galeria() {
    this.loading = false;
    // for(var i = 0; i < this.lstSedeImagens.length; i++)
    // {
    //   this.lstSedeImagens[i].imagem = `data:image/png;base64, ` + this.lstSedeImagens[i].imagem;
    // }
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);


    

    let strRequest: string = `${API_URL}/api/upload`;
    if (this.sede.sedeId != null) {
      strRequest = `${API_URL}/api/upload?id=` + this.sede.sedeId + `&entidade=unidades`;
    }

    const uploadReq = new HttpRequest('POST', strRequest, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.Response) {
        debugger;
        this.imagem = `data:image/png;base64, ` + event.body[0].toString();
      }
    });
  }

  guardaImagemGaleria(files) {
    debugger;
    if (files.length === 0)
      return;

    this.novaImagemGaleria = files;
  }

  Mascara() {
    this.commonService.MascaraCEP(document.getElementById('txtCep'));
    this.commonService.SomenteNumeros(document.getElementById('txtQtdVisitantes'));
    this.commonService.SomenteNumeros(document.getElementById('txtQtdAssociados'));
  }

  uploadImagemGaleria() {
    this.loading = true;
    if (this.novaImagemGaleria.length === 0)
    
      return;

    let sedeId: Number = this.sede.sedeId;

    const formData = new FormData();

    for (let file of this.novaImagemGaleria)
      formData.append(file.name, file);


    const uploadReq = new HttpRequest('POST', `${API_URL}/api/upload?id=` + sedeId, formData, {
      reportProgress: true,
    });


    
    this.http.request(uploadReq).subscribe(event => {
      console.log(event);
      if (event.type === HttpEventType.Response) {
        this.loading = false;
        //this.imagem = `data:image/png;base64, ` + event.body.toString();
        this.lstImagensGaleria.push(this.novaImagemGaleria);

        this.ListarSedesImagens();

        let fileUploadGaleria: any = document.getElementById('fileUploadGaleria');
        fileUploadGaleria.value = '';
      }
      else
      {
        this.loading = false;
      }
    });
  }

  handleFileInput(file) {
  }

  openModal(template: TemplateRef<any>) {
    this.isNewSedeEmail = true;
    this.sedeEmails.ativo = true;
    this.sedeEmails = new SedeEmails();
    this.modalRef = this.modalService.show(template);
  }

  Validar() {
    this.required = false;
    this.success = false;
    this.erro = false;
    this.mensagem = '';

    if (this.sede.titulo == undefined || this.sede.titulo.trim() == '') {
      this.required = true;
      this.mensagem += `Um nome para a unidade deve ser informado.\n`;
    }

    if (this.sede.email == undefined || this.sede.email.trim() == '') {
      this.required = true;
      this.mensagem += `Informe um e-mail para a sede.\n`;
    }

    if (!this.validateEmail(this.sede.email)) {
      this.required = true;
      this.mensagem += `E-mail inválido.\n`;
    }

    if (!this.required) {
      return true;
    }
    else {
      //this.alertService.success(e);
      return false;
    }
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  cadastrarSede() {
    this.loading = true;
    let imgUnidade: any = document.getElementById('imgUnidade');

    if (!isUndefined(imgUnidade) && imgUnidade != null) {
      this.sede.imagem = imgUnidade.src;
    }

    if (this.Validar())
    {
      if (this.isNew) {
        this.sedeServico.insert(this.sede).subscribe(c => {
          this.loading = false;
          this.mensagem = `Registro inserido com sucesso.`;
          this.success = true;
          this.isNew = false;

          this.sede.sedeId = c.sedeId;
        },
          error => {
            this.erro = true;
            this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
          });
      } else {
        this.sedeServico.edit(this.sede).subscribe(c => {
          this.loading = false;
          this.mensagem = `Registro atualizado com sucesso.`;
          this.success = true;

          this.sede.sedeId = c.sedeId;
        },
          error => {
            this.success = true;
            this.mensagem = "Ops, um erro ocorreu. Tente novamente.";
          });
      }
    }
    else
    {
      this.loading = false;
    }
  }

  openModalEdit(template: TemplateRef<any>, id: number) {
    this.isNewSedeEmail = false;

    this.sedeEmailsService.getSedeBySedeEmailId(id).subscribe(c => {
      this.sedeEmails = c[0];
      this.modalRef = this.modalService.show(template);
    });
  }

  openModalDel(template: TemplateRef<any>, id: number) {
    this.isNewSedeEmail = false;

    this.sedeEmailsService.getSedeBySedeEmailId(id).subscribe(c => {
      this.sedeEmails = c[0];
      this.modalRefDel = this.modalService.show(template);
    });
  }

  confirm() {
    this.sedeEmails.sedeId = this.sede.sedeId;

    if (this.isNewSedeEmail) {
      this.sedeEmailsService.insertSedeEmail(this.sedeEmails).subscribe(c => {
        this.carregarSedeEmails();

        if (this.modalRef !== undefined) {
          this.modalRef.hide();
        }
      });
    } else {
      this.sedeEmailsService.updateSedeEmail(this.sedeEmails).subscribe(c => {
        this.carregarSedeEmails();

        if (this.modalRef !== undefined) {
          this.modalRef.hide();
        }
      });
    }
  }

  carregarSedeEmails() {
    this.lstSedeEmails = [];
    this.sedeEmailsService.getAllBySedeId(this.sede.sedeId).subscribe(c => {
      this.lstSedeEmails = c;

      if (isUndefined(this.lstSedeEmails) || this.lstSedeEmails.length == 0) {
        this.exibirDestinatarios = false;
      }
      else {
        this.exibirDestinatarios = true;
      }
    });
  }

  decline(tempalte: TemplateRef<any>): void {
    if (this.modalRef !== undefined) {
      this.modalRef.hide();
    }
  }

  declineDel(tempalte: TemplateRef<any>): void {
    if (this.modalRefDel !== undefined) {
      this.modalRefDel.hide();
    }
  }

  deletar() {
    this.sedeEmailsService.deleteSedeEmail(this.sedeEmails.sedeEmailId).subscribe(c => {
      this.alertService.success(this.sedeEmails.email + ' deletado com sucesso.');

      this.carregarSedeEmails();

      if (this.modalRefDel !== undefined) {
        this.modalRefDel.hide();
      }
    });
  }
}
export class Permissions {
  btnCadastrar: boolean;
}
*/


