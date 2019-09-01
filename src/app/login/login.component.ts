import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Usuarios } from '../models/Usuarios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // model: any = {};
  usuarios: Usuarios = new Usuarios();
  permissions: Permissions = new Permissions();
  public loading = false;
  
  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit() {
    // this.model.usuario = 'gabriel.souza';
    // this.model.senha = 'hMhtqAHg3oQs1JwdnQ+bKfOk+StB/VU8QlYt2Oum3Sse/MGrWWkSzy73fbB+kcg9NntM4cTMB8+VBrndybmrPQ==';
    this.usuarios.usuario = 'gabriel.souza';
    this.usuarios.senha = 'hMhtqAHg3oQs1JwdnQ+bKfOk+StB/VU8QlYt2Oum3Sse/MGrWWkSzy73fbB+kcg9NntM4cTMB8+VBrndybmrPQ==';

    // this.authService.verificarPermissao('v').then(c => { this.permissions.btnVerificar = c; });
  }

  logar() {    
    if (!this.usuarios.usuario || !this.usuarios.senha) { return; }
    this.loading = true;
    this.authService
      .login(this.usuarios.usuario, this.usuarios.senha).toPromise().then(
        data => {
          if (data.authenticated) {          
            localStorage.setItem('currentUser', JSON.stringify(data));
            this.router.navigate(['/cadastros/unidades']);
          }
        },
        error => {
          const a: string[] = [];
          a.push(error.error.message);
        }
      ).then(c => {
        this.loading = false;
      });
  }
}

export class Permissions {
  btnVerificar: boolean;
}
