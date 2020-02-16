import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { TipoItensComponent } from './tipo-itens.component';
import { TipoItensCadastroComponent } from './tipo-itens-cadastro/tipo-itens-cadastro.component';
import { TipoItensDeleteComponent } from './tipo-itens-delete/tipo-itens-delete.component';

const routes: Routes = [
  { path: 'tipo-itens', component: TipoItensComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'tipo-itens/cadastro', component: TipoItensCadastroComponent},
  { path: 'tipo-itens/cadastro/:id', component: TipoItensCadastroComponent},
  { path: 'tipo-itens/deletar/:id', component: TipoItensDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class TipoItensRoutingModule { }