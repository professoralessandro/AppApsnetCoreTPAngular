import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UnidadesComponent } from './cadastros/unidades/unidades.component';
import { CadastroComponent } from './cadastros/unidades/cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';
import { from } from 'rxjs';
import { OperacionalModule } from './operacional/operacional.module';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastros', loadChildren: './cadastros/cadastros.module#CadastrosModule' },
  { path: 'operacional', loadChildren: './operacional/operacional.module#OperacionalModule' },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }