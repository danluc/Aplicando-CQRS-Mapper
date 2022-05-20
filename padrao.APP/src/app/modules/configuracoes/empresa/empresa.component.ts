import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { Empresas } from 'app/core/models/empresas/empresa';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { UsuariosControllerService } from 'app/core/services/controllers/usuarios-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-empresa',
    templateUrl: './empresa.component.html',
    styleUrls: ['./empresa.component.scss'],
})
export class EmpresaComponent implements OnInit {
    public dados: Empresas = new Empresas();
    public form: FormGroup;
    public salvando: boolean = false;

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _usuariosControllerService: UsuariosControllerService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService,
        private _formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this._selecionarEmpresa();
        this.form = this._formBuilder.group({
            nome: ['', [Validators.maxLength(150), Validators.required]],
            email: ['', [Validators.maxLength(150)]],
            telefone: ['', [Validators.maxLength(30)]],
            cpfcnpj: ['', [Validators.maxLength(100)]],
            imagem: ['', [Validators.maxLength(255)]],
        });
    }

    private _selecionarEmpresa(): void {
        this._fuseLoadingService.show();
        this._usuariosControllerService.listarUsuarios().subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao buscar dados: ' + res.mensagem
                    );
                    return;
                }
                this.dados = res.empresa;
                this._setarDados();
                this._fuseLoadingService.hide();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao buscar dados: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    private _setarDados(): void {
        this.form.get('nome').setValue(this.dados.nome);
        this.form.get('email').setValue(this.dados.email);
        this.form.get('telefone').setValue(this.dados.telefone);
        this.form.get('cpfcnpj').setValue(this.dados.cpfcnpj);
        this.form.get('imagem').setValue(this.dados.imagem);
    }

    public salvar(): void {
        if (this.form.invalid) {
            return;
        }
        this.salvando = true;
        this._fuseLoadingService.show();
    }
}
