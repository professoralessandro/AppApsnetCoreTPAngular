import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesComponent } from './unidades/unidades.component';
import { RouterModule } from '@angular/router';
import { UnidadesRoutingModule } from './unidades/unidades.routing';

//import { CadastroComponent } from './unidades/cadastro/cadastro.component';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
//import { DeletarUnidadeComponent } from './unidades/deletar-unidade/deletar-unidade.component';
//import { AlertService } from '../_resources/_components/alert/alert.service';
import { AlertComponent } from '../_resources/_components/alert/alert.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxEditorModule } from 'ngx-editor';
import { NgxLoadingModule } from 'ngx-loading';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { RequiredIfDirective } from '../_helpers/RequiredIf';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';

@NgModule({
  declarations: [
   /*  RequiredIfDirective,
    AlertComponent,
    */
    UnidadesComponent,
    /*
    CadastroComponent,
    DeletarUnidadeComponent,
    */
  ],
  imports: [
    CKEditorModule,
    TypeaheadModule.forRoot(),
    NgxPaginationModule, // Nosso módulo recém instalado
    NgxMyDatePickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    DateValueAccessorModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    UnidadesRoutingModule,
    CurrencyMaskModule
  ],
  providers: [
    //AlertService,
    //AuthGuard
  ]
})
export class CadastrosModule { }