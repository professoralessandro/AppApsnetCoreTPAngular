import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BloqueioFrequentadoresComponent } from './bloqueio-frequentadores.component';

// import { CreateComponent } from './create/create.component';
import { CadastroBloqueioFrequentadoresComponent } from './cadastro-bloqueio-frequentadores/cadastro-bloqueio-frequentadores.component';
import { DeletarBloqueioFrequentadoresComponent } from './deletar-bloqueio-frequentadores/deletar-bloqueio-frequentadores.component';
import { BuscaCadastroBloqueioFrequentadoresComponent } from './busca-cadastro-bloqueio-frequentadores/busca-cadastro-bloqueio-frequentadores.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'bloqueio-frequentadores', component: BloqueioFrequentadoresComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'bloqueio-frequentadores/cadastro', component: CadastroBloqueioFrequentadoresComponent },
  { path: 'bloqueio-frequentadores/editar/:id/:isVisitante/:isBloqueado', component: CadastroBloqueioFrequentadoresComponent },
  { path: 'bloqueio-frequentadores/deletar/:id', component: DeletarBloqueioFrequentadoresComponent },
  { path: 'bloqueio-frequentadores/buscar', component: BuscaCadastroBloqueioFrequentadoresComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})

export class BloqueioFrequentadoresRoutingModule { }