import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from '../../environments/API_URL';
import { Usuarios } from '../models/Usuarios';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    
    login(username: string, password: string) {
        const usuario = new Usuarios();
        usuario.usuario = username;
        usuario.senha = password;
        console.log(`${API_URL}/api/login`);
        return this.http.post<any>(`${API_URL}/api/login`, usuario);
    }

    validaPermissao() {
        // Implement
    }

    pegarUsuario() {
        return localStorage.getItem('currentUser');
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    verificarPermissao(chave: string) {           
        return this.http.get<boolean>(`${API_URL}/api/auth?chave=${chave}`).toPromise();
    }
}
