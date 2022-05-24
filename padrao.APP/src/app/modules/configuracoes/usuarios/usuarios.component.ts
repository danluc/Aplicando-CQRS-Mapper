import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { Usuarios } from 'app/core/models/usuarios/usuarios';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { UsuariosControllerService } from 'app/core/services/controllers/usuarios-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';
import { CadastrarUsuarioComponent } from './cadastrar-usuario/cadastrar-usuario.component';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    public tabelaOrder: MatSort;
    public tabelaDados: MatTableDataSource<any> = new MatTableDataSource();
    public tabelaColunas: string[] = ['nome', 'email', 'dataCadastro', 'acoes'];
    public usuarios: Array<Usuarios> = [];
    public usuarioLogado: Usuarios;

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _usuariosControllerService: UsuariosControllerService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService
    ) {}

    ngOnInit() {
        this.usuarioLogado = this._authenticationService.currentUserValue;
        this._buscarUsuarios();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    private _buscarUsuarios(): void {
        this._fuseLoadingService.show();
        this._usuariosControllerService.listarUsuarios().subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao buscar usuários: ' + res.mensagem
                    );
                    return;
                }
                this.usuarios = res.empresa.usuarios;
                this.tabelaDados.data = this.usuarios;
                this.tabelaDados.sort = this.tabelaOrder;
                this._fuseLoadingService.hide();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao buscar usuários: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    public alterarSenha(): void {
        const dialogRef = this._matDialog.open(AlterarSenhaComponent, {
            width: window.innerWidth < 600 ? '95%' : 'auto',
            maxWidth: window.innerWidth < 600 ? '99vw' : 'auto',
            autoFocus: false,
            disableClose: true,
            data: {},
        });

        dialogRef.afterClosed().subscribe((result) => {});
    }

    public modalNovo(): void {
        const dialogRef = this._matDialog.open(CadastrarUsuarioComponent, {
            width: window.innerWidth < 600 ? '95%' : 'auto',
            maxWidth: window.innerWidth < 600 ? '99vw' : 'auto',
            autoFocus: false,
            disableClose: true,
            data: {
                verbo: VerbosHTTP.POST,
                dados: {},
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._buscarUsuarios();
            }
        });
    }
}
