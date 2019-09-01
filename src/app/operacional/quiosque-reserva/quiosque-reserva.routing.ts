import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { QuiosqueReservaComponent } from './quiosque-reserva.component';
import { ConfirmacaoComponent } from './confirmacao/confirmacao.component';


const routes: Routes = [
    { path: 'quiosque-reserva', component: QuiosqueReservaComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
    { path: 'confirmacao', component: ConfirmacaoComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuiosqueReservaRoutingModule { }
