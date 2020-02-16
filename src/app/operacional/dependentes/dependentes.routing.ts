import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//ASSOCIADOS
// import { AssociadosComponent,DeletarComponent,CadastroComponent } from './'


import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { DependentesComponent } from './dependentes.component';
import { CadastroDependenteComponent } from './cadastro-dependente/cadastro-dependente.component';
import { DeletarDependenteComponent } from './deletar-dependente/deletar-dependente.component';

const routes: Routes = [
  { path: 'dependente', component: DependentesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'dependente/cadastro', component: CadastroDependenteComponent },
  { path: 'dependente/cadastro/:id', component: CadastroDependenteComponent },
  { path: 'dependente/deletar/:id', component: DeletarDependenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})

export class DependentesRoutingModule { }