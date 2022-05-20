import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { LoginDTO } from 'app/core/models/usuarios/LoginDTO';
import { AuthenticationService } from 'app/core/services/authentication.service';

@Component({
    selector: 'auth-sign-in',
    templateUrl: './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignInComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signInForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
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
        // Create the form
        this.signInForm = this._formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            senha: [null, Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void {
        // Return if the form is invalid
        if (this.signInForm.invalid) {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        const login: LoginDTO = {
            email: this.signInForm.get('email').value,
            senha: this.signInForm.get('senha').value,
        };

        this._authenticationService.login(login).subscribe(
            (res) => {
                this._router.navigateByUrl('/inicio');
            },
            (err) => {
                this.signInForm.enable();
                this.alert = {
                    type: 'error',
                    message: err.error,
                };
                this.showAlert = true;
            }
        );
    }
}
