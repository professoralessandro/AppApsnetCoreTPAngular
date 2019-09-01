import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { RouterModule } from '@angular/router';
import { BibliotecaRoutingModule } from './biblioteca/biblioteca.routing';

@NgModule({
  declarations: [
   /*  RequiredIfDirective,
    AlertComponent, */
    BibliotecaComponent,
  ],
  imports: [
    BibliotecaRoutingModule,
  ]
})
export class CadastrosModule { }