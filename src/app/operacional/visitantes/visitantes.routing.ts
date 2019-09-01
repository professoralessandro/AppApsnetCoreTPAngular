import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisitantesComponent } from './visitantes.component';

// import { CreateComponent } from './create/create.component';
import { CadastroVisitantesComponent } from './cadastro-visitantes/cadastro-visitantes.component';
import { DeletarVisitantesComponent } from './deletar-visitantes/deletar-visitantes.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'visitantes', component: VisitantesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'visitantes/cadastro', component: CadastroVisitantesComponent },
  { path: 'visitantes/editar/:id', component: CadastroVisitantesComponent },
  { path: 'visitantes/deletar/:id', component: DeletarVisitantesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})

export class VisitantesRoutingModule { }