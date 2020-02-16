import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//colaboradores
import { ColaboradoresComponent} from './colaboradores.component'

import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';

const routes: Routes = [
  { path: 'colaboradores', component: ColaboradoresComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService, 
  ]
})
export class ColaboradoresRoutingModule { }