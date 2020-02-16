import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { QuiosqueDetalheComponent } from './quiosque-detalhe.component';


const routes: Routes = [
    { path: 'quiosque-detalhe', component: QuiosqueDetalheComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },
    { path: 'quiosque-detalhe/:id', component: QuiosqueDetalheComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuiosqueDetalheRoutingModule { }