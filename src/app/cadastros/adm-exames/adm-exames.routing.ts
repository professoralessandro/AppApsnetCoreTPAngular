import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { AdmExamesCadastroComponent } from './adm-exames-cadastro/adm-exames-cadastro.component';
import { AdmExamesComponent } from './adm-exames.component';
import { AdmExamesDeleteComponent } from './adm-exames-delete/adm-exames-delete.component';


const routes: Routes = [
  { path: 'adm-exames', component: AdmExamesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'adm-exames/cadastro', component: AdmExamesCadastroComponent },
  { path: 'adm-exames/cadastro/:id', component: AdmExamesCadastroComponent },
  { path: 'adm-exames/deletar/:id', component: AdmExamesDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmExamesRoutingModule { }