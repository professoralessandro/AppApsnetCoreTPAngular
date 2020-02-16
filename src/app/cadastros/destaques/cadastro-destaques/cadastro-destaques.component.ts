import { Component, OnInit } from '@angular/core';
import { Feed } from 'src/app/models/Feed';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CommonService } from 'src/app/services/common.service';
import { ImagemService } from 'src/app/services/imagem.service';
import { FeedService } from 'src/app/services/feed.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { isUndefined } from 'util';
import { EventosService } from 'src/app/services/eventos.service';
import { Eventos } from 'src/app/models/Eventos';
import { ActivatedRoute } from '@angular/router';
import {
    INgxMyDpOptions,
    IMyDateModel
} from 'ngx-mydatepicker';
import { Alert } from 'selenium-webdriver';
import { TipoServico } from 'src/app/models/TipoServico';

@Component({
    selector: 'app-destaques',
    templateUrl: './cadastro-destaques.component.html',
    styleUrls: ['./cadastro-destaques.component.scss']
})

export class CadastroDestaquesComponent implements OnInit {
    public loading = false;

    public listaFeeds: Feed[] = [];
    public listaEventos: Eventos[] = [];
    public feed: Feed = new Feed();


    date = new Date();
    // IMyDateModel Setting:  
    myOptions: INgxMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        sunHighlight: true,
    };

    inicio: any;
    final: any;

    file: any;
    imagem: string;
    isNew = true;
    success = false;
    error = false;
    mensagem = '';

    public Editor1 = ClassicEditor;

    constructor(
        private feedService: FeedService,
        private commonService: CommonService,
        private eventosService: EventosService,
        private authService: AuthenticationService,
        private router: ActivatedRoute,
        private imagemService: ImagemService
    ) {
        this.feed.textoDescricao = '';
    }

    required = false;
    public dataCadastro: string;
    private dataCadastroHoje: Date;
    public dataValidadeDe: string;
    public dataDeHoje: any;
    public dataValidadeAte: string;
    public descricaoPortal: string;
    public link: string;
    public publico: string;
    public textoDescricao: string;
    public titulo: string;

    ngOnInit() {

        this.loading = true;
        this.feed.ativo = true;
        this.feed.descricaoPortal = '';
        this.isNew = true;
        this.imagem = '';

        this.authService.verificarPermissao('Grupos').then(c => { 
        }).catch(this.handleError);

        this.router.paramMap.subscribe(c => {
            if (c.get('id') != null) {
                this.feedService.getAll(Number(c.get('id')), null, null).subscribe(x => {
                    console.log(x);
                    this.feed = x[0];
                    //LINHAS NOVAS DE TESTE
                    //CARREGA INFORMAÇÃO DA DATA E DA HORA DE INICIO (dataValidadeDe)
                    let inicio: Date = new Date(x[0].dataValidadeDe);

                    if (x[0].dataValidadeDe !== null && x[0].dataValidadeDe != undefined) {
                        this.inicio = {
                            date: {
                                year: inicio.getFullYear(),
                                month: inicio.getMonth() + 1,
                                day: inicio.getDate()
                            }
                        };
                    }
                    let final: Date = new Date(x[0].dataValidadeAte);

                    //CARREGA INFORMAÇÃO DA DATA E DA HORA DE dataValidateAte
                    if (x[0].dataValidadeAte !== null && x[0].dataValidadeAte != undefined) {

                        this.final = {
                            date: {
                                year: final.getFullYear(),
                                month: final.getMonth() + 1,
                                day: final.getDate()
                            }
                        };
                    }
                    //DEBUGAR
                    //console.log(inicio);
                    this.imagemService.getPathRead('ImagensFeedLeitura', this.feed.imagem).subscribe(z => {
                        if (this.feed.imagem !== null) {
                            this.imagem = z.toString();
                        }
                    });
                    this.isNew = false;
                    this.loading = false;
                });
            }
            else if (c.get('id') == null)
            {
                this.loading = false;
            }
        });
        
        this.bindEventos();
    }

    private handleError() {
        location.href = '/login';
    }

    bindEventos() {
        this.eventosService.getAllAtivos().subscribe(c => {
            this.listaEventos = c;
        });
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
        if (this.commonService.strIsInvalid(this.feed.titulo) || this.commonService.strIsInvalid(this.feed.dataValidadeDe) || this.commonService.strIsInvalid(this.feed.descricaoPortal) ||
            this.feed.eventoId === 0) {
            return false;
        }
        return true;
    }

    isValidDate() {
        if (this.feed.dataValidadeDe > this.feed.dataValidadeAte) {
            return false;
        }
        return true;
    }

    /*
    ValidarData(obj: any)
    {
        
        var today = new Date();

          if (obj.value.toString().trim().length < 10) {
            this.error = true;
            if (isUndefined(this.mensagem))
              this.mensagem = '';
      
            this.mensagem = `Data inválida.\n`;
            return false;
          }
      
          if (isNaN(Date.parse(obj.value.toString().trim()))) {
            this.error = true;
            if (isUndefined(this.mensagem))
              this.mensagem = '';
      
            this.mensagem = `Data inválida.\n`;
            return false;
          }
          debugger;
          if ((today.getMonth() + 1) > 12 && isNaN(Date.parse(obj.value.toString().trim()))) {
            this.error = true;
            if (isUndefined(this.mensagem))
              this.mensagem = '';
      
            this.mensagem = `Data inválida.\n`;
            return false;
          }

        return true;

        /*
        //DATA
        var today = new Date();

        if ((today.getMonth() + 1) > 12 && isNaN(Date.parse(obj.value.toString().trim()))) {
        this.erro = true;
        if (isUndefined(this.mensagem))
            this.mensagem = '';

        this.mensagem = `Data inválida.\n`;
        return false;
        }
    }
    */
    Mascara() {
        this.commonService.MascaraData(document.getElementById('txtDataEnvioInicio'));
        this.commonService.MascaraData(document.getElementById('txtDataEnvioFim'));
    }


    salvar()
    {
        //DEBUGAR
        //console.log(this.feed.dataValidadeDe);
        this.loading = true;
        this.success = false;
        this.mensagem = '';
        this.error = false;

        if (!this.isValid()) {
            this.error = true;
            this.loading = false;
            this.mensagem = 'Preencha todos os campos em amarelo!';
            return;
        }

        if (!this.isValidDate()) {
            this.error = true;
            this.loading = false;
            this.mensagem = 'O campo de valido de não pode ser menor que valido até!';
            return;
        }

        /*
        if (!this.ValidarData(this.feed.dataValidadeDe)) {
            this.error = true;
            this.mensagem = 'O campo de valido de não pode ser menor que valido Hoje!';
            this.loading = false;
            return;
        }
        */

        if (this.isNew) {
            this.imagem = "";
            this.feed.imagem = "";
            if (isUndefined(this.file)) {
                return;
            }

            const formData = new FormData();

            for (const f of this.file) {
                formData.append(f.name, f);
            }

            this.imagemService.saveImage('ImagensFeedGravacao', formData).subscribe(imagens => {
                this.feed.imagem = imagens[0];

                this.feedService.insert(this.feed).subscribe(c => {
                    this.success = true;
                    this.mensagem = ('Registro inserido com sucesso.');
                    this.loading = false;
                });
            });
        } else {
            this.imagem = "";
            this.feed.imagem = "";
            if (isUndefined(this.file)) {
                this.feedService.edit(this.feed).subscribe(c => {
                    this.success = true;
                    this.mensagem = ('Registro atualizado com sucesso.');
                    this.loading = false;
                });
            } else {
                const formData = new FormData();

                for (const f of this.file) {
                    formData.append(f.name, f);
                }

                this.imagemService.saveImage('ImagensFeedGravacao', formData).subscribe(imagens => {

                    this.feed.imagem = imagens[0];

                    this.feedService.edit(this.feed).subscribe(c => {
                        this.success = true;
                        this.mensagem = ('Registro atualizado com sucesso.');
                        this.loading = false;
                    });
                });
            }
        }
    }
}
