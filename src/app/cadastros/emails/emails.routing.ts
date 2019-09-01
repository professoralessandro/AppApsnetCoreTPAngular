import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MailingMailsComponent } from './emails.component';
import { CadastroemailsComponent } from './cadastro-emails/cadastro-emails.component';
import { DeleteMailingMailsComponent } from './deletar-emails/deletar-emails.component';
import { AuthGuard } from 'src/app/_guards';

const routes: Routes = [
  { path: 'emails', component: MailingMailsComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'emails/cadastro-emails', component: CadastroemailsComponent },
  { path: 'emails/cadastro-emails/:id', component: CadastroemailsComponent },
  { path: 'emails/deletar-emails/:id', component: DeleteMailingMailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailsRoutingModule { }