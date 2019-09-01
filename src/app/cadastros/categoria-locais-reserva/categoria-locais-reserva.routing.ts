import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriaLocaisReservaComponent } from './categoria-locais-reserva.component';
import { CadastroCategoriaLocaisReservaComponent } from './cadastro-categoria-locais-reserva/cadastro-categoria-locais-reserva.component';
import { DeletarCategoriaComponent } from './deletar-categoria/deletar-categoria.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';


const routes: Routes = [
  { path: 'categoria-locais-reserva', component: CategoriaLocaisReservaComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'categoria-locais-reserva/cadastro', component: CadastroCategoriaLocaisReservaComponent},
  { path: 'categoria-locais-reserva/cadastro/:id', component: CadastroCategoriaLocaisReservaComponent},
  { path: 'categoria-locais-reserva/deletar/:id', component: DeletarCategoriaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})

export class CategoriaLocaisReservaRoutingModule { }