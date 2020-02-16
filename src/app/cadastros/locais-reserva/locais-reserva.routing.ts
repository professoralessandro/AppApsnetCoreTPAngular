import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocaisReservaComponent } from './locais-reserva.component';
import { CadastroLocaisReservaComponent } from './cadastro-locais-reserva/cadastro-locais-reserva.component';
import { DeletarLocaisReservaComponent } from './deletar-locais-reserva/deletar-locais-reserva.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'locais-reserva', component: LocaisReservaComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'locais-reserva/cadastro', component: CadastroLocaisReservaComponent},
  { path: 'locais-reserva/cadastro/:id', component: CadastroLocaisReservaComponent},
  { path: 'locais-reserva/deletar/:id', component: DeletarLocaisReservaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class LocaisReservaRoutingModule { }