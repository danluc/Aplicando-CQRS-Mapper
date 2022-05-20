import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { AuthenticationService } from 'app/core/services/authentication.service';


@Injectable({ providedIn: 'root' })
export class PerfilGuard implements CanActivate, CanActivateChild {
    /**
     * Constructor
     */
    constructor(
        private _authenticationService: AuthenticationService,
        private _router: Router
    ) {}

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (!route.data || !route.data.perfis) {
            return true;
        }

        /*const perfil = this._authenticationService.currentUserValue.perfil;

        const podeAcessar = route.data.perfis.includes(perfil);

        if (!podeAcessar) {
            this._router.navigate(['']);
        }*/

        return true;
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean | UrlTree {
        if (!route.data || !route.data.perfis) {
            return true;
        }
        /*const perfil = this._authenticationService.currentUserValue.perfil;
        const podeAcessar = route.data.perfis.includes(perfil);

        if (!podeAcessar) {
            this._router.navigate(['']);
        }*/

        return true;
    }
}
