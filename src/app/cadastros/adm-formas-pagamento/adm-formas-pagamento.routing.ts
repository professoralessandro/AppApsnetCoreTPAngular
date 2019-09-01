import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { AdmFormasPagamentoComponent } from './adm-formas-pagamento.component';
import { AdmFormasPagamentoCadastroComponent } from './adm-formas-pagamento-cadastro/adm-formas-pagamento-cadastro.component';
import { AdmFormasPagamentoDeleteComponent } from './adm-formas-pagamento-delete/adm-formas-pagamento-delete.component';


const routes: Routes = [
  { path: 'adm-formas-pagamento', component: AdmFormasPagamentoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'adm-formas-pagamento/cadastro', component: AdmFormasPagamentoCadastroComponent },
  { path: 'adm-formas-pagamento/cadastro/:id', component: AdmFormasPagamentoCadastroComponent },
  { path: 'adm-formas-pagamento/deletar/:id', component: AdmFormasPagamentoDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmFormasPagamentoRoutingModule { }