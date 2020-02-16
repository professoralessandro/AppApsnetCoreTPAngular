import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { QuiosqueConfigComponent } from './quiosque-config.component';
import { QuiosqueConfigCadastroComponent } from './quiosque-config-cadastro/quiosque-config-cadastro.component';
import { QuiosqueConfigDeleteComponent } from './quiosque-config-delete/quiosque-config-delete.component';

const routes: Routes = [
  { path: 'quiosque-config', component: QuiosqueConfigComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'quiosque-config/cadastro', component: QuiosqueConfigCadastroComponent},
  { path: 'quiosque-config/cadastro/:id', component: QuiosqueConfigCadastroComponent},
  { path: 'quiosque-config/deletar/:id', component: QuiosqueConfigDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class QuiosqueConfigRoutingModule { }