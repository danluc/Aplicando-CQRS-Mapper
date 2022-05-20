import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Navigation } from 'app/core/navigation/navigation.types';
import { menuprincipal } from './menu-principal';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(private _authenticationService: AuthenticationService) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        const menuDoSistema = {
            compact: menuprincipal,
            default: [],
            futuristic: [],
            horizontal: [],
        };
        const locations = new Observable<Navigation>((observer) => {
            observer.next(menuDoSistema);
            observer.complete();
        }).pipe(
            tap((e) => {
                this._navigation.next(e);
            })
        );
        return locations;
    }
}
