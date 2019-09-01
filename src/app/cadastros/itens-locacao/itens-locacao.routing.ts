import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { ItensLocacaoComponent } from './itens-locacao.component';
import { ItensLocacaoCadastroComponent } from './itens-locacao-cadastro/itens-locacao-cadastro.component';
import { ItensLocacaoDeleteComponent } from './itens-locacao-delete/itens-locacao-delete.component';

const routes: Routes = [
  { path: 'itens-locacao', component: ItensLocacaoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'itens-locacao/cadastro', component: ItensLocacaoCadastroComponent},
  { path: 'itens-locacao/cadastro/:id', component: ItensLocacaoCadastroComponent },
  { path: 'itens-locacao/deletar/:id', component: ItensLocacaoDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItensLocacaoRoutingModule { }