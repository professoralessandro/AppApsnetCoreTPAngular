import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  //{ path: '', pathMatch: 'full', component: LoginComponent },
  //{ path: 'login', component: LoginComponent },
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosModule' },
  //{ path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
