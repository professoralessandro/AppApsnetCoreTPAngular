/*
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
//import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthenticationService) { }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const role = route.data.role as string;
        let temPermissao = true;

        return true;

        // if (localStorage.getItem('currentUser') || this.router.url === '/esqsenha') {
        //     if (role == null) {
        //         return true;
        //     } else {
        //         await this.authService.verificarPermissao(role).then(c => {
        //             temPermissao = c;
        //         }).catch(error => {
        //             this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //         });

        //         return temPermissao;
        //     }
        // } else {
        //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //     return false;
        // }
    }
}
*/
