import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { FinsDeSemanaComponent } from './fins-de-semana.component';
import { FinsDeSemanaCadastroComponent } from './fins-de-semana-cadastro/fins-de-semana-cadastro.component';
import { FinsDeSemanaDeleteComponent } from './fins-de-semana-delete/fins-de-semana-delete.component';

const routes: Routes = [
  { path: 'fins-de-semana', component: FinsDeSemanaComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'fins-de-semana/cadastro', component: FinsDeSemanaCadastroComponent},
  { path: 'fins-de-semana/cadastro/:id', component: FinsDeSemanaCadastroComponent},
  { path: 'fins-de-semana/deletar/:id', component: FinsDeSemanaDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class FinsDeSemanaRoutingModule { }