import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { AdmFeriadosComponent } from './adm-feriados.component';
import { AdmFeriadosCadastroComponent } from './adm-feriados-cadastro/adm-feriados-cadastro.component';
import { AdmFeriadosDeleteComponent } from './adm-feriados-delete/adm-feriados-delete.component';


const routes: Routes = [
  { path: 'adm-feriados', component: AdmFeriadosComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'adm-feriados/cadastro', component: AdmFeriadosCadastroComponent },
  { path: 'adm-feriados/cadastro/:id', component: AdmFeriadosCadastroComponent },
  { path: 'adm-feriados/deletar/:id', component: AdmFeriadosDeleteComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdmFeriadosRoutingModule { }