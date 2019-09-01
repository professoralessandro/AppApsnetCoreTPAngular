import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoServicoComponent } from './tipo-servico.component';
import { CadastroTipoServicoComponent } from './cadastro-tipo-servico/cadastro-tipo-servico.component';
import { DeletarTipoServicoComponent } from './deletar-tipo-servico/deletar-tipo-servico.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'tipo-servico', component: TipoServicoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'tipo-servico/cadastro-tipo-servico', component: CadastroTipoServicoComponent },
  { path: 'tipo-servico/cadastro-tipo-servico/:id', component: CadastroTipoServicoComponent },
  { path: 'tipo-servico/deletar/:id', component: DeletarTipoServicoComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class TipoServicoRoutingModule { }