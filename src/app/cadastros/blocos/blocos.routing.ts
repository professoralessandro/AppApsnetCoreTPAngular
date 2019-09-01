import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlocosComponent } from './blocos.component';
import { CadastroBlocosComponent } from './cadastro-blocos/cadastro-blocos.component';
import { DeletarBlocosComponent } from './deletar-blocos/deletar-blocos.component';
import { AuthGuard } from 'src/app/_guards';

const routes: Routes = [
  { path: 'blocos', component: BlocosComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'blocos/cadastro-blocos', component: CadastroBlocosComponent },
  { path: 'blocos/cadastro-blocos/:id', component: CadastroBlocosComponent },
  { path: 'blocos/deletar/:id', component: DeletarBlocosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlocosRoutingModule { }