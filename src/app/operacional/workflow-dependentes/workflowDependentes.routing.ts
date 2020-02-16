import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkflowDependentesComponent } from './workflow-dependentes.component';
import { EncaminharComponent } from './encaminhar/encaminhar.component';
import { ReprovaDependenteComponent } from './reprova-dependente/reprova-dependente.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'workflow-dependentes', component: WorkflowDependentesComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
  { path: 'workflow-dependentes/encaminhar/:id', component: EncaminharComponent },
  { path: 'workflow-dependentes/reprova-dependente/:id', component: ReprovaDependenteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class WorkflowDependenteRoutingModule { }