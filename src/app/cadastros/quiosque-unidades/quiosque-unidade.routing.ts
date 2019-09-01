import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { QuiosqueUnidadesComponent } from './quiosque-unidades.component';
import { QuiosqueUnidadesCadastroComponent } from './quiosque-unidades-cadastro/quiosque-unidades-cadastro.component';
import { QuiosqueUnidadesDeleteComponent } from './quiosque-unidades-delete/quiosque-unidades-delete.component';

const routes: Routes = [
  { path: 'quiosque-unidade', component: QuiosqueUnidadesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'quiosque-unidade/cadastro', component: QuiosqueUnidadesCadastroComponent},
  { path: 'quiosque-unidade/cadastro/:id', component: QuiosqueUnidadesCadastroComponent},
  { path: 'quiosque-unidade/deletar/:id', component: QuiosqueUnidadesDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class QuiosqueUnidadeRoutingModule { }