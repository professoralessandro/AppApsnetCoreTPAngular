import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnidadesComponent } from './cadastros/unidades/unidades.component';
import { from } from 'rxjs';


const routes: Routes = [
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosModule' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }