import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortoComponent } from './porto.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { DeletarComponent } from './deletar/deletar.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'porto', component: PortoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'porto/cadastro', component: CadastroComponent },
  { path: 'porto/cadastro/:id', component: CadastroComponent },
  { path: 'porto/deletar/:id', component: DeletarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class PortoRoutingModule { }