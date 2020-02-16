import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { QuiosqueBloqueioComponent } from './quiosque-bloqueio.component';
import { QuiosqueBloqueioDeletarComponent } from './quiosque-bloqueio-deletar/quiosque-bloqueio-deletar.component';
import { QuiosqueBloqueioCadastroComponent } from './quiosque-bloqueio-cadastro/quiosque-bloqueio-cadastro.component';

const routes: Routes = [
  { path: 'quiosque-bloqueio', component: QuiosqueBloqueioComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'quiosque-bloqueio/cadastro', component: QuiosqueBloqueioCadastroComponent},
  { path: 'quiosque-bloqueio/cadastro/:id', component: QuiosqueBloqueioCadastroComponent},
  { path: 'quiosque-bloqueio/deletar/:id', component: QuiosqueBloqueioDeletarComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class QuiosqueBloqueioRoutingModule { }