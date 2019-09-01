import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnidadesComponent } from './unidades/unidades.component';
import { RouterModule } from '@angular/router';
import { UnidadesRoutingModule } from './unidades/unidades.routing';

import { CadastroComponent } from './unidades/cadastro/cadastro.component';
import { AndaresComponent } from './andares/andares.component';
import { AndaresRoutingModule } from './andares/andares.routing';
import { EmailsLoteEnvioComponent } from './emails-lote-envio/emails-lote-envio.component';
import { EmailsLoteEnvioRoutingModule } from './emails-lote-envio/emails-lote-envio.routing';
import { CadastroAndaresComponent } from './andares/cadastro-andares/cadastro-andares.component';
import { CadastroEmailsLoteEnvioComponent } from './emails-lote-envio/cadastro-emails-lote-envio/cadastro-emails-lote-envio.component';
import { MailingMailsComponent } from './emails/emails.component';
import { EmailsRoutingModule } from './emails/emails.routing';
import { CadastroemailsComponent } from './emails/cadastro-emails/cadastro-emails.component';
import { BlocosComponent } from './blocos/blocos.component';
import { BlocosRoutingModule } from './blocos/blocos.routing';
import { CadastroBlocosComponent } from './blocos/cadastro-blocos/cadastro-blocos.component';
import { LocaisAcessoComponent } from './locais-acesso/locais-acesso.component';
import { LocaisAcessoRoutingModule } from './locais-acesso/locais-acesso.routing';
import { TipoAcomodacaoComponent } from './tipo-acomodacao/tipo-acomodacao.component';
import { TipoAcomodacaoRoutingModule } from './tipo-acomodacao/tipo-acomodacao.routing';
import { CadastroTipoAcomodacaoComponent } from './tipo-acomodacao/cadastro-tipo-acomodacao/cadastro-tipo-acomodacao.component';
import { TipoServicoComponent } from './tipo-servico/tipo-servico.component';
import { TipoServicoRoutingModule } from './tipo-servico/tipo-servico.routing';
import { CadastroTipoServicoComponent } from './tipo-servico/cadastro-tipo-servico/cadastro-tipo-servico.component';
import { CategoriaLocaisReservaComponent } from './categoria-locais-reserva/categoria-locais-reserva.component';
import { CategoriaLocaisReservaRoutingModule } from './categoria-locais-reserva/categoria-locais-reserva.routing';
import { CadastroCategoriaLocaisReservaComponent } from './categoria-locais-reserva/cadastro-categoria-locais-reserva/cadastro-categoria-locais-reserva.component';
import { LocaisReservaComponent } from './locais-reserva/locais-reserva.component';
import { LocaisReservaRoutingModule } from './locais-reserva/locais-reserva.routing';
import { CadastroLocaisReservaComponent } from './locais-reserva/cadastro-locais-reserva/cadastro-locais-reserva.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { DeletarUnidadeComponent } from './unidades/deletar-unidade/deletar-unidade.component';
import { AlertService } from '../_resources/_components/alert/alert.service';
import { AlertComponent } from '../_resources/_components/alert/alert.component';
import { DeletarAndaresComponent } from './andares/deletar-andares/deletar-andares.component';
import { DeleteMailingMailsComponent } from './emails/deletar-emails/deletar-emails.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditarLocalAcessoComponent } from './locais-acesso/editar-local-acesso/editar-local-acesso.component';
import { AuthGuard } from '../_guards';
import { DeletarBlocosComponent } from './blocos/deletar-blocos/deletar-blocos.component';
import { DeletarTipoAcomodacaoComponent } from './tipo-acomodacao/deletar-tipo-acomodacao/deletar-tipo-acomodacao.component';
import { DeletarTipoServicoComponent } from './tipo-servico/deletar-tipo-servico/deletar-tipo-servico.component';
import { DeletarLocalAcessoComponent } from './locais-acesso/deletar-local-acesso/deletar-local-acesso.component';
import { DeletarLocaisReservaComponent } from './locais-reserva/deletar-locais-reserva/deletar-locais-reserva.component';
import { DeletarCategoriaComponent } from './categoria-locais-reserva/deletar-categoria/deletar-categoria.component';
import { NgxEditorModule } from 'ngx-editor';
import { DestaquesComponent } from './destaques/destaques.component';
import { DestaquesRoutingModule } from './destaques/destaques.routing';
import { CadastroDestaquesComponent } from './destaques/cadastro-destaques/cadastro-destaques.component';
import { DeletarDestaquesComponent } from './destaques/deletar-destaques/deletar-destaques.component';
import { SobreComponent } from './sobre/sobre.component';
import { SobreRoutingModule } from './sobre/sobre.routing';
import { MidiaComponent } from './midia/midia.component';
import { MidiaRoutingModule } from './midia/midia.routing';
import { CadastroMidiaComponent } from './midia/cadastro-midia/cadastro-midia.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DeleteMidiaComponent } from './midia/delete-midia/delete-midia.component';
import { QuiosqueBloqueioComponent } from './quiosque-bloqueio/quiosque-bloqueio.component';
import { QuiosqueBloqueioRoutingModule } from './quiosque-bloqueio/quiosque-bloqueio.routing';
import { QuiosqueBloqueioCadastroComponent } from './quiosque-bloqueio/quiosque-bloqueio-cadastro/quiosque-bloqueio-cadastro.component';
import { QuiosqueBloqueioDeletarComponent } from './quiosque-bloqueio/quiosque-bloqueio-deletar/quiosque-bloqueio-deletar.component';
import { QuiosqueConfigComponent } from './quiosque-config/quiosque-config.component';
import { QuiosqueConfigCadastroComponent } from './quiosque-config/quiosque-config-cadastro/quiosque-config-cadastro.component';
import { QuiosqueConfigDeleteComponent } from './quiosque-config/quiosque-config-delete/quiosque-config-delete.component';
import { QuiosqueConfigRoutingModule } from './quiosque-config/quiosque-config.routing';
import { QuiosqueUnidadesComponent } from './quiosque-unidades/quiosque-unidades.component';
import { QuiosqueUnidadesCadastroComponent } from './quiosque-unidades/quiosque-unidades-cadastro/quiosque-unidades-cadastro.component';
import { QuiosqueUnidadesDeleteComponent } from './quiosque-unidades/quiosque-unidades-delete/quiosque-unidades-delete.component'
import { QuiosqueUnidadeRoutingModule } from './quiosque-unidades/quiosque-unidade.routing';
import { AdmExamesComponent } from './adm-exames/adm-exames.component';
import { AdmExamesCadastroComponent } from './adm-exames/adm-exames-cadastro/adm-exames-cadastro.component';
import { AdmExamesDeleteComponent } from './adm-exames/adm-exames-delete/adm-exames-delete.component';
import { AdmExamesRoutingModule } from './adm-exames/adm-exames.routing';
import { FinsDeSemanaComponent } from './fins-de-semana/fins-de-semana.component';
import { FinsDeSemanaCadastroComponent } from './fins-de-semana/fins-de-semana-cadastro/fins-de-semana-cadastro.component';
import { FinsDeSemanaDeleteComponent } from './fins-de-semana/fins-de-semana-delete/fins-de-semana-delete.component';
import { AdmFeriadosComponent } from './adm-feriados/adm-feriados.component';
import { AdmFeriadosCadastroComponent } from './adm-feriados/adm-feriados-cadastro/adm-feriados-cadastro.component';
import { AdmFeriadosDeleteComponent } from './adm-feriados/adm-feriados-delete/adm-feriados-delete.component';
import { FinsDeSemanaRoutingModule } from './fins-de-semana/fins-de-semana.routing';
import { AdmFeriadosRoutingModule } from './adm-feriados/adm-feriados.routing';
import { AdmFormasPagamentoComponent } from './adm-formas-pagamento/adm-formas-pagamento.component';
import { AdmFormasPagamentoCadastroComponent } from './adm-formas-pagamento/adm-formas-pagamento-cadastro/adm-formas-pagamento-cadastro.component';
import { AdmFormasPagamentoDeleteComponent } from './adm-formas-pagamento/adm-formas-pagamento-delete/adm-formas-pagamento-delete.component';
import { AdmFormasPagamentoRoutingModule } from './adm-formas-pagamento/adm-formas-pagamento.routing';
import { GruposCategoriasComponent } from './grupos-categorias/grupos-categorias.component';
import { GrupoCategoriasCadastroComponent } from './grupos-categorias/grupo-categorias-cadastro/grupo-categorias-cadastro.component';
import { GrupoCategoriasDeleteComponent } from './grupos-categorias/grupo-categorias-delete/grupo-categorias-delete.component';
import { GrupoCategoriasRoutingModule } from './grupos-categorias/grupo-categorias.routing';
import { TipoItensComponent } from './tipo-itens/tipo-itens.component';
import { TipoItensCadastroComponent } from './tipo-itens/tipo-itens-cadastro/tipo-itens-cadastro.component';
import { TipoItensDeleteComponent } from './tipo-itens/tipo-itens-delete/tipo-itens-delete.component';
import { TipoItensRoutingModule } from './tipo-itens/tipo-itens.routing';
import { ItensLocacaoComponent } from './itens-locacao/itens-locacao.component';
import { ItensLocacaoCadastroComponent } from './itens-locacao/itens-locacao-cadastro/itens-locacao-cadastro.component';
import { ItensLocacaoDeleteComponent } from './itens-locacao/itens-locacao-delete/itens-locacao-delete.component';
import { ItensLocacaoRoutingModule } from './itens-locacao/itens-locacao.routing';
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
    AlertComponent, */
    UnidadesComponent,
    CadastroComponent,
    AndaresComponent,
    EmailsLoteEnvioComponent,
    CadastroAndaresComponent,
    BlocosComponent,
    CadastroBlocosComponent,
    MailingMailsComponent,
    CadastroemailsComponent,
    LocaisAcessoComponent,
    TipoAcomodacaoComponent,
    CadastroTipoAcomodacaoComponent,
    TipoServicoComponent,
    CadastroTipoServicoComponent,
    CategoriaLocaisReservaComponent,
    CadastroCategoriaLocaisReservaComponent,
    LocaisReservaComponent,
    CadastroLocaisReservaComponent,
    DeletarUnidadeComponent,
    DeletarAndaresComponent,
    EditarLocalAcessoComponent,
    DeletarBlocosComponent,
    DeleteMailingMailsComponent,
    DeletarTipoAcomodacaoComponent,
    DeletarTipoServicoComponent,
    DeletarLocalAcessoComponent,
    DeletarLocaisReservaComponent,
    DeletarCategoriaComponent,
    CadastroEmailsLoteEnvioComponent,
    DestaquesComponent,
    CadastroDestaquesComponent,
    DeletarDestaquesComponent,
    SobreComponent,
    MidiaComponent,
    CadastroMidiaComponent,
    DeleteMidiaComponent,
    QuiosqueBloqueioComponent,
    QuiosqueBloqueioCadastroComponent,
    QuiosqueBloqueioDeletarComponent,
    QuiosqueConfigComponent,
    QuiosqueConfigCadastroComponent,
    QuiosqueConfigDeleteComponent,
    QuiosqueUnidadesComponent,
    QuiosqueUnidadesCadastroComponent,
    QuiosqueUnidadesDeleteComponent,
    AdmExamesComponent,
    AdmExamesCadastroComponent,
    AdmExamesDeleteComponent,
    FinsDeSemanaComponent,
    FinsDeSemanaCadastroComponent,
    FinsDeSemanaDeleteComponent,
    AdmFeriadosComponent,
    AdmFeriadosCadastroComponent,
    AdmFeriadosDeleteComponent,
    AdmFormasPagamentoComponent,
    AdmFormasPagamentoCadastroComponent,
    AdmFormasPagamentoDeleteComponent,
    FinsDeSemanaComponent,
    GruposCategoriasComponent,
    GrupoCategoriasCadastroComponent,
    GrupoCategoriasDeleteComponent,
    TipoItensComponent,
    TipoItensCadastroComponent,
    TipoItensDeleteComponent,
    ItensLocacaoComponent,
    ItensLocacaoCadastroComponent,
    ItensLocacaoDeleteComponent,
  ],
  imports: [
    CKEditorModule,
    TypeaheadModule.forRoot(),
    NgxPaginationModule, // Nosso módulo recém instalado
    NgxMyDatePickerModule.forRoot(),
    NgxMaskModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxLoadingModule.forRoot({}),
    DateValueAccessorModule,
    ModalModule.forRoot(),
    FormsModule,
    CommonModule,
    UnidadesRoutingModule,
    AndaresRoutingModule,
    EmailsLoteEnvioRoutingModule,
    BlocosRoutingModule,
    EmailsRoutingModule,
    LocaisAcessoRoutingModule,
    SobreRoutingModule,
    TipoAcomodacaoRoutingModule,
    TipoServicoRoutingModule,
    CategoriaLocaisReservaRoutingModule,
    LocaisReservaRoutingModule,
    NgxEditorModule,
    EmailsLoteEnvioRoutingModule,
    DestaquesRoutingModule,
    MidiaRoutingModule,
    QuiosqueBloqueioRoutingModule,
    QuiosqueConfigRoutingModule,
    QuiosqueUnidadeRoutingModule,
    AdmExamesRoutingModule,
    FinsDeSemanaRoutingModule,
    AdmFeriadosRoutingModule,
    AdmFormasPagamentoRoutingModule,
    FinsDeSemanaRoutingModule,
    GrupoCategoriasRoutingModule,
    TipoItensRoutingModule,
    ItensLocacaoRoutingModule,
    CurrencyMaskModule
  ],
  providers: [
    AlertService,
    AuthGuard
  ]
})
export class CadastrosModule { }