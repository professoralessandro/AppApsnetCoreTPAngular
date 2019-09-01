import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuiosqueComponent } from './quiosque/quiosque.component';
import { ReactiveFormsModule } from '@angular/forms';

//ASSOCIADOS
import { AssociadosComponent,DeletarComponent,CadastroComponent } from './associados';
import { AssociadosRoutingModule } from './associados/associados.routing';
import { WorkflowDependenteRoutingModule } from './workflow-dependentes/workflowDependentes.routing';
import { ColaboradoresRoutingModule } from './colaboradores/colaboradores.routing';
import { VisitantesRoutingModule } from './visitantes/visitantes.routing';
import { BloqueioFrequentadoresRoutingModule } from './bloqueio-frequentadores/bloqueio-frequentadores.routing';
import { RouterModule } from '@angular/router';
import { QuiosqueRoutingModule } from './quiosque/quiosque.routing';
import { QuiosqueReservaRoutingModule } from './quiosque-reserva/quiosque-reserva.routing';
import { QuiosqueDetalheRoutingModule } from './quiosque/quiosque-detalhe/quiosque-detalhe.routing';
import { QuiosqueReservaComponent } from './quiosque-reserva/quiosque-reserva.component';
import { QuiosqueDetalheComponent } from './quiosque/quiosque-detalhe/quiosque-detalhe.component';
import { NgxPaginationModule } from 'ngx-pagination';


//SHARED
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { ConfirmacaoComponent } from './quiosque-reserva/confirmacao/confirmacao.component';
import { AlertService } from '../_resources/_components/alert/alert.service';
import { AlertComponent } from '../_resources/_components/alert/alert.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AuthGuard } from '../_guards';

import { NgxEditorModule } from 'ngx-editor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import { NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { RequiredIfDirective } from '../_helpers/RequiredIf';
import { MyDatePickerModule } from 'mydatepicker';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { BloqueioComponent } from './associados/bloqueio/bloqueio.component';
import { DependentesCadastroComponent } from './associados/dependentes-cadastro/dependentes-cadastro.component';
import { WorkflowDependentesComponent } from './workflow-dependentes/workflow-dependentes.component';
import { EncaminharComponent } from './workflow-dependentes/encaminhar/encaminhar.component';
import { ReprovaDependenteComponent } from './workflow-dependentes/reprova-dependente/reprova-dependente.component';

import { DependentesComponent } from './dependentes/dependentes.component';

import { CadastroDependenteComponent } from './dependentes/cadastro-dependente/cadastro-dependente.component';
import { DeletarDependenteComponent } from './dependentes/deletar-dependente/deletar-dependente.component';
import { DependentesRoutingModule } from './dependentes/dependentes.routing';

import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { VisitantesComponent } from './visitantes/visitantes.component';
import { CadastroVisitantesComponent } from './visitantes/cadastro-visitantes/cadastro-visitantes.component';
import { DeletarVisitantesComponent } from './visitantes/deletar-visitantes/deletar-visitantes.component';
import { BloqueioFrequentadoresComponent } from './bloqueio-frequentadores/bloqueio-frequentadores.component';
import { CadastroBloqueioFrequentadoresComponent } from './bloqueio-frequentadores/cadastro-bloqueio-frequentadores/cadastro-bloqueio-frequentadores.component';
import { DeletarBloqueioFrequentadoresComponent } from './bloqueio-frequentadores/deletar-bloqueio-frequentadores/deletar-bloqueio-frequentadores.component';
import { BloqueioFrequentadores } from '@app/models/BloqueioFrequentadores';
import { BuscaCadastroBloqueioFrequentadoresComponent } from './bloqueio-frequentadores/busca-cadastro-bloqueio-frequentadores/busca-cadastro-bloqueio-frequentadores.component';
 

@NgModule({

  declarations: [
    RequiredIfDirective,
    AlertComponent,   
    //Componentes 
    AssociadosComponent,DeletarComponent,CadastroComponent, BloqueioComponent, ColaboradoresComponent, DependentesComponent, CadastroDependenteComponent, DeletarDependenteComponent, WorkflowDependentesComponent, ReprovaDependenteComponent,EncaminharComponent,
    QuiosqueComponent, QuiosqueReservaComponent, QuiosqueDetalheComponent, ConfirmacaoComponent,BloqueioComponent, ColaboradoresComponent, VisitantesComponent, 
    CadastroVisitantesComponent, DeletarVisitantesComponent, BloqueioFrequentadoresComponent, CadastroBloqueioFrequentadoresComponent, DeletarBloqueioFrequentadoresComponent, BuscaCadastroBloqueioFrequentadoresComponent
  ],
  imports: [
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    QuiosqueRoutingModule,
    QuiosqueReservaRoutingModule,
    QuiosqueDetalheRoutingModule,

    WorkflowDependenteRoutingModule,

    DependentesRoutingModule,


    AssociadosRoutingModule,
    ColaboradoresRoutingModule,
    VisitantesRoutingModule,
    BloqueioFrequentadoresRoutingModule,
    CKEditorModule,
    NgxMyDatePickerModule.forRoot(),
    MyDatePickerModule,
    NgxPaginationModule,
    TypeaheadModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    DateValueAccessorModule,
    ModalModule.forRoot(),
    FormsModule,     
    NgxEditorModule,    
    CurrencyMaskModule,
    NgxEditorModule,
    DateValueAccessorModule,
    BsDatepickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    ReactiveFormsModule
  ],
  providers: [
    AlertService,
    AuthGuard
  ]
})
export class OperacionalModule { }