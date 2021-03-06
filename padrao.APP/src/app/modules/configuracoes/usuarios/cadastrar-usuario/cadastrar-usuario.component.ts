import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { RegistrarDTO } from 'app/core/models/usuarios/registrarDTO';
import { Usuarios } from 'app/core/models/usuarios/usuarios';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { UsuariosControllerService } from 'app/core/services/controllers/usuarios-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-cadastrar-usuario',
    templateUrl: './cadastrar-usuario.component.html',
    styleUrls: ['./cadastrar-usuario.component.scss'],
})
export class CadastrarUsuarioComponent implements OnInit {
    public form: FormGroup;
    public salvando: boolean = false;
    public enumVerbosHTTP: typeof VerbosHTTP = VerbosHTTP;

    public permissoes: Array<string> = new Array<string>();
    public permissaoConfig: boolean = false;
    public permissaoClientes: boolean = true;
    public permissaoHotel: boolean = false;
    public permissaoMotorista: boolean = false;
    public permissaoCarro: boolean = false;

    constructor(
        public matDialogRef: MatDialogRef<CadastrarUsuarioComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { dados: Usuarios; verbo: VerbosHTTP },
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _usuariosControllerService: UsuariosControllerService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        if (this.data.verbo == VerbosHTTP.POST) {
            this._formularioCriar();
        } else {
            this._formularioAlterar();
        }
    }

    public fechar(): void {
        this.matDialogRef.close(false);
    }

    private _formularioCriar(): void {
        this.form = this._formBuilder.group({
            nome: ['', [Validators.maxLength(200), Validators.required]],
            email: [
                '',
                [
                    Validators.maxLength(200),
                    Validators.email,
                    Validators.required,
                ],
            ],
        });
    }

    private _formularioAlterar(): void {
        this.form = this._formBuilder.group({
            nome: [
                this.data.dados.nome,
                [Validators.maxLength(200), Validators.required],
            ],
            email: [
                this.data.dados.email,
                [
                    Validators.maxLength(200),
                    Validators.email,
                    Validators.required,
                ],
            ],
        });
        const permissoes = this.data.dados.funcao.funcoes.split(',');
        permissoes.forEach((e) => {
            if (e.includes('1')) {
                this.permissaoConfig = true;
            }
            if (e.includes('2')) {
                this.permissaoClientes = true;
            }
            if (e.includes('3')) {
                this.permissaoHotel = true;
            }
            if (e.includes('4')) {
                this.permissaoMotorista = true;
            }
            if (e.includes('5')) {
                this.permissaoCarro = true;
            }
        });
    }

    private setPermissoes(): void {
        this.permissoes = [];
        if (this.permissaoConfig) {
            this.permissoes.push('1');
        }
        if (this.permissaoClientes) {
            this.permissoes.push('2');
        }
        if (this.permissaoHotel) {
            this.permissoes.push('3');
        }
        if (this.permissaoMotorista) {
            this.permissoes.push('4');
        }
        if (this.permissaoCarro) {
            this.permissoes.push('5');
        }
    }

    public salvar(): void {
        if (!this.form.valid) {
            this.form.markAsTouched();
            return;
        }

        if (this.permissoes.length == 0) {
            this._toastService.mensagemError('Selecione pelo menos um acesso!');
            return;
        }

        if (this.data.verbo == VerbosHTTP.POST) {
            this._cadastrar();
        } else {
            this._atualizarAcesso();
        }
    }

    private _cadastrar(): void {
        this.setPermissoes();
        let dados = this.form.value as RegistrarDTO;
        dados.funcoes = this.permissoes.join(',');
        dados.senha = '123456';
        this._fuseLoadingService.show();
        this.salvando = true;
        this._usuariosControllerService.adicionarUsuario(dados).subscribe(
            (res) => {
                this.salvando = false;
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao cadastrar: ' + res.mensagem
                    );
                    return;
                }
                this._toastService.mensagemSuccess(
                    'Dados cadastrado com sucesso!'
                );
                this.matDialogRef.close(true);
                this._fuseLoadingService.hide();
            },
            (err) => {
                this.salvando = false;
                console.log(err.error);
                this._fuseLoadingService.hide();
                this._toastService.mensagemError(
                    'Erro ao cadastrar: ' + err.error
                );
            }
        );
    }

    private _atualizarAcesso(): void {
        this.setPermissoes();
        this._fuseLoadingService.show();
        this.salvando = true;
        this._usuariosControllerService
            .alterarFuncao(this.permissoes.join(','), this.data.dados.codigo)
            .subscribe(
                (res) => {
                    this.salvando = false;
                    if (!res.sucesso) {
                        this._toastService.mensagemError(
                            'Erro ao alterar: ' + res.mensagem
                        );
                        return;
                    }
                    this._toastService.mensagemSuccess(
                        'Dados atualizado com sucesso!'
                    );
                    this.matDialogRef.close(true);
                    this._fuseLoadingService.hide();
                },
                (err) => {
                    this.salvando = false;
                    console.log(err.error);
                    this._fuseLoadingService.hide();
                    this._toastService.mensagemError(
                        'Erro ao alterar: ' + err.error
                    );
                }
            );
    }
}
