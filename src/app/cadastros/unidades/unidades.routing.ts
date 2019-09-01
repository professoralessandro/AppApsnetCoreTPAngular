import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesComponent } from './unidades.component';
// import { CreateComponent } from './create/create.component';
//import { CadastroComponent } from './cadastro/cadastro.component';
//import { DeletarUnidadeComponent } from './deletar-unidade/deletar-unidade.component';
//import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'livros', component: UnidadesComponent },
  //{ path: 'livros/cadastro', component: CadastroComponent },
  //{ path: 'livros/cadastro/:id', component: CadastroComponent },
  //{ path: 'livros/deletar/:id', component: DeletarUnidadeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class UnidadesRoutingModule { }