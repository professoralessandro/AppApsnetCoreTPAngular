import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaisAcessoComponent } from './locais-acesso.component';
import { EditarLocalAcessoComponent } from './editar-local-acesso/editar-local-acesso.component';
import { DeletarLocalAcessoComponent } from './deletar-local-acesso/deletar-local-acesso.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'locais-acesso', component: LocaisAcessoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'locais-acesso/editar/:id', component: EditarLocalAcessoComponent },
  { path: 'locais-acesso/deletar/:id', component: DeletarLocalAcessoComponent},
  { path: 'locais-acesso/editar', component: DeletarLocalAcessoComponent}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class LocaisAcessoRoutingModule { }