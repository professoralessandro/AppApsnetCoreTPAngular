import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { DestaquesComponent } from './destaques.component';
import { CadastroDestaquesComponent } from './cadastro-destaques/cadastro-destaques.component';
import { DeletarDestaquesComponent } from './deletar-destaques/deletar-destaques.component';

const routes: Routes = [
  { path: 'destaques', component: DestaquesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'destaques/cadastro', component: CadastroDestaquesComponent},
  { path: 'destaques/cadastro/:id', component: CadastroDestaquesComponent },
  { path: 'destaques/deletar/:id', component: DeletarDestaquesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DestaquesRoutingModule { }