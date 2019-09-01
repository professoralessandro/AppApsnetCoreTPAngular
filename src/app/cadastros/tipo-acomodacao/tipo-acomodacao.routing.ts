import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TipoAcomodacaoComponent } from './tipo-acomodacao.component';
import { CadastroTipoAcomodacaoComponent } from './cadastro-tipo-acomodacao/cadastro-tipo-acomodacao.component';
import { DeletarTipoAcomodacaoComponent } from './deletar-tipo-acomodacao/deletar-tipo-acomodacao.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'tipo-acomodacao', component: TipoAcomodacaoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'tipo-acomodacao/cadastro-tipo-acomodacao', component: CadastroTipoAcomodacaoComponent },
  { path: 'tipo-acomodacao/cadastro-tipo-acomodacao/:id', component: CadastroTipoAcomodacaoComponent },
  { path: 'tipo-acomodacao/deletar/:id', component: DeletarTipoAcomodacaoComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class TipoAcomodacaoRoutingModule { }