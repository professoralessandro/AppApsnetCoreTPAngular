import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CadastrosModule } from './cadastros/cadastros.module';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoginComponent } from './login/login.component';
import { SedeService } from './services/sede.service';
import { FormsModule } from '@angular/forms';
import { AlertComponent } from './_resources/_components/alert/alert.component';
import { AlertService } from './_resources/_components/alert/alert.service';
import { JwtInterceptor } from './_helpers';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './_guards';
import { NgxLoadingModule } from 'ngx-loading';
import { OperacionalModule } from './operacional/operacional.module';
import { from } from 'rxjs';
import { PagamentosModalComponent } from './_resources/_components/pagamentos-modal/pagamentos-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxMaskModule } from 'ngx-mask';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotFoundComponent,
    LoginComponent,
    PagamentosModalComponent,
    
  ],
  imports: [
    ModalModule.forRoot(),
    NgxMaskModule.forRoot(),
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    SedeService,
    AuthGuard,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  entryComponents: [PagamentosModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
