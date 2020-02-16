import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//ASSOCIADOS
import { AssociadosComponent,DeletarComponent,CadastroComponent } from './'


import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'associados', component: AssociadosComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'associados/cadastro', component: CadastroComponent },
  { path: 'associados/cadastro/:id', component: CadastroComponent },
  { path: 'associados/deletar/:id', component: DeletarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class AssociadosRoutingModule { }