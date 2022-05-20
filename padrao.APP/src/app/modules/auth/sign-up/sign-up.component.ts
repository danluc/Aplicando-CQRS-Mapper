import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertType } from '@fuse/components/alert';
import { AuthService } from 'app/core/auth/auth.service';
import { LoginDTO } from 'app/core/models/usuarios/LoginDTO';
import { RegistrarDTO } from 'app/core/models/usuarios/registrarDTO';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { UsuariosControllerService } from 'app/core/services/controllers/usuarios-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'auth-sign-up',
    templateUrl: './sign-up.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations,
})
export class AuthSignUpComponent implements OnInit {
    @ViewChild('signUpNgForm') signUpNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type: 'success',
        message: '',
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _authService: AuthService,
        private _formBuilder: FormBuilder,
        private _router: Router,
        private _authenticationService: AuthenticationService,
        private _usuariosControllerService: UsuariosControllerService,
        private _toastService: ToastService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Create the form
        this.signUpForm = this._formBuilder.group({
            nome: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            senha: ['', Validators.required],
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign up
     */
    signUp(): void {
        if (this.signUpForm.invalid) {
            return;
        }
        this.signUpForm.disable();
        this.showAlert = false;
        const dados = this.signUpForm.value as RegistrarDTO;
        this._usuariosControllerService.registrar(dados).subscribe(
            (response) => {
                if (response.sucesso) {
                    this._login(dados.email, dados.senha);
                    this._toastService.mensagemSuccess(
                        'Cadastro realizado com sucesso!'
                    );
                    return;
                }
                this.signUpForm.enable();
                this.signUpNgForm.resetForm();
                this.alert = {
                    type: 'error',
                    message: response.mensagem,
                };
                this.showAlert = true;
            },
            (response) => {
                this.signUpForm.enable();
                this.signUpNgForm.resetForm();
                this.alert = {
                    type: 'error',
                    message:
                        'Alguma coisa deu errado. Por favor tente outra vez.' + response,
                };
                this.showAlert = true;
            }
        );
    }

    private _login(email: string, senha: string): void {
        const login: LoginDTO = {
            email: email,
            senha: senha,
        };

        this._authenticationService.login(login).subscribe(
            (res) => {
                this._router.navigateByUrl('/inicio');
            },
            (err) => {
                this.signUpForm.enable();
                this.alert = {
                    type: 'error',
                    message: err.error,
                };
                this.showAlert = true;
            }
        );
    }
}
