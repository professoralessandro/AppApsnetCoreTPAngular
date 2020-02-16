import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmailsLoteEnvioComponent } from './emails-lote-envio.component';
import { AuthGuard } from 'src/app/_guards';
import { CommonService } from 'src/app/services/common.service';
import { CadastroEmailsLoteEnvioComponent } from './cadastro-emails-lote-envio/cadastro-emails-lote-envio.component';

const routes: Routes = [
  { path: 'emails-lote-envio', component: EmailsLoteEnvioComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'emails-lote-envio/cadastro', component: CadastroEmailsLoteEnvioComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }},
  { path: 'emails-lote-envio/cadastro/:id', component: CadastroEmailsLoteEnvioComponent, canActivate: [AuthGuard], data: { role: 'Grupos' }}
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommonService
  ]
})
export class EmailsLoteEnvioRoutingModule { }