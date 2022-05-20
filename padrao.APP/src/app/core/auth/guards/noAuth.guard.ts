import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    CanActivateChild,
    CanLoad,
    Route,
    Router,
    RouterStateSnapshot,
    UrlSegment,
    UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { switchMap } from 'rxjs/operators';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class NoAuthGuard implements CanActivate, CanActivateChild, CanLoad {
    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Can activate
     *
     * @param route
     * @param state
     */
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._check();
    }

    /**
     * Can activate child
     *
     * @param childRoute
     * @param state
     */
    canActivateChild(
        childRoute: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this._check();
    }

    /**
     * Can load
     *
     * @param route
     * @param segments
     */
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this._check();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Check the authenticated status
     *
     * @private
     */
    private _check(): Observable<boolean> {
        // If the user is authenticated...
        if (!!this._authenticationService.currentUserValue) {
            // Redirect to the root
            this._router.navigate(['']);
            // Prevent the access
            return of(false);
        }
        // Allow the access
        return of(true);
    }
}
