import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { GruposCategoriasComponent } from './grupos-categorias.component';
import { GrupoCategoriasCadastroComponent } from './grupo-categorias-cadastro/grupo-categorias-cadastro.component';
import { GrupoCategoriasDeleteComponent } from './grupo-categorias-delete/grupo-categorias-delete.component';

const routes: Routes = [
  { path: 'grupo-categorias', component: GruposCategoriasComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'grupo-categorias/cadastro', component: GrupoCategoriasCadastroComponent},
  { path: 'grupo-categorias/cadastro/:id', component: GrupoCategoriasCadastroComponent },
  { path: 'grupo-categorias/deletar/:id', component: GrupoCategoriasDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoCategoriasRoutingModule { }