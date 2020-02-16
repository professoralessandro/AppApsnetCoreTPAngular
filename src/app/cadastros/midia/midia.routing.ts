import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { MidiaComponent } from './midia.component';
import { CadastroMidiaComponent } from './cadastro-midia/cadastro-midia.component';
import { DeleteMidiaComponent } from './delete-midia/delete-midia.component';

const routes: Routes = [
  { path: 'midia', component: MidiaComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'midia/cadastro', component: CadastroMidiaComponent},
  { path: 'midia/cadastro/:id', component: CadastroMidiaComponent},
  { path: 'midia/deletar/:id', component: DeleteMidiaComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService,
  ]
})
export class MidiaRoutingModule { }