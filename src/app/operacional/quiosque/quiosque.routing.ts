import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_guards';
import { QuiosqueComponent } from './quiosque.component';


const routes: Routes = [
    { path: 'quiosque', component: QuiosqueComponent, canActivate: [AuthGuard], data: { role: 'Grupos' } },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class QuiosqueRoutingModule { }