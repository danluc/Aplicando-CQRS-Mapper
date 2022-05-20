import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { UsuariosControllerService } from 'app/core/services/controllers/usuarios-controller.service';
import { ToastService } from 'app/core/services/toast.service';


@Component({
    selector: 'app-alterar-senha',
    templateUrl: './alterar-senha.component.html',
    styleUrls: ['./alterar-senha.component.scss'],
})
export class AlterarSenhaComponent implements OnInit {
    public form: FormGroup;
    public mostrarFormulario: boolean = false;
    public salvando: boolean = false;

    constructor(
        public matDialogRef: MatDialogRef<AlterarSenhaComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: any,
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _usuariosControllerService: UsuariosControllerService,
        private _fuseLoadingService: FuseLoadingBarService
    ) {}

    ngOnInit() {
        this.form = this._formBuilder.group({
            senha: ['', [Validators.maxLength(25), Validators.required]],
            confirmaSenha: [
                '',
                [Validators.maxLength(25), Validators.required],
            ],
        });
        this.mostrarFormulario = true;
    }

    private get _validarSenhasIguais(): boolean {
        const novaSenha: string = this.form.get('senha').value;
        const confirmaSenha: string = this.form.get('confirmaSenha').value;

        if (novaSenha !== confirmaSenha) {
            this._toastService.mensagemError('Senhas diferentes.');
            return false;
        }
        return true;
    }

    public salvar(): void {
        if (this.form.invalid || !this._validarSenhasIguais) {
            return;
        }
        this.salvando = true;
        this._fuseLoadingService.show();
        this._usuariosControllerService
            .alterarSenha(this.form.get('senha').value)
            .subscribe(
                (res) => {
                    this._toastService.mensagemSuccess(
                        'Senha alterada com sucesso!'
                    );
                    this.matDialogRef.close(true);
                    this._fuseLoadingService.hide();
                },
                (err) => {
                    console.log(err.error);
                    this.salvando = false;
                    this._toastService.mensagemError(
                        'Erro ao alterar senha: ' + err.error
                    );
                    this._fuseLoadingService.hide();
                }
            );
    }

    public fechar(): void {
        this.matDialogRef.close();
    }
}
