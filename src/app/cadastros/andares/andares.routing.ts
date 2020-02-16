import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AndaresComponent } from './andares.component';
import { CadastroAndaresComponent } from './cadastro-andares/cadastro-andares.component';
import { DeletarAndaresComponent } from './deletar-andares/deletar-andares.component';
import { AuthGuard } from 'src/app/_guards';


const routes: Routes = [
  { path: 'andares', component: AndaresComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'andares/cadastro-andares', component: CadastroAndaresComponent },
  { path: 'andares/cadastro-andares/:id', component: CadastroAndaresComponent },
  { path: 'andares/deletar/:id', component: DeletarAndaresComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndaresRoutingModule { }