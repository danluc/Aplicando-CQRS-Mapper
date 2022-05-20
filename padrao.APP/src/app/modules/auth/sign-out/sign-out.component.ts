import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, timer } from 'rxjs';
import { finalize, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Component({
    selector: 'auth-sign-out',
    templateUrl: './sign-out.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class AuthSignOutComponent implements OnInit, OnDestroy {
    countdown: number = 3;
    countdownMapping: any = {
        '=1': '# second',
        other: '# seconds',
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _authenticationService: AuthenticationService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Sign out
        this._authenticationService.logout();

        // Redirect after the countdown
        timer(100, 100)
            .pipe(
                finalize(() => {
                    this._router.navigate(['sign-in']);
                }),
                takeWhile(() => this.countdown > 0),
                takeUntil(this._unsubscribeAll),
                tap(() => this.countdown--)
            )
            .subscribe();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
