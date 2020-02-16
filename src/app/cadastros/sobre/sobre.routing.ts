import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { SobreComponent } from './sobre.component';

const routes: Routes = [
  { path: 'sobre', component: SobreComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SobreRoutingModule { }