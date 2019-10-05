import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesComponent } from './unidades.component';
// import { CreateComponent } from './create/create.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DeletarUnidadeComponent } from './deletar-unidade/deletar-unidade.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'porto', component: UnidadesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'porto/cadastro/:local', component: CadastroComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'porto/cadastro/:id/:local', component: CadastroComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'porto/deletar/:id', component: DeletarUnidadeComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class UnidadesRoutingModule { }