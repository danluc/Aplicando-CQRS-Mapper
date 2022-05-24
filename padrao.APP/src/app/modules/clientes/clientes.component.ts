import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { PaginacaoDTO } from 'app/core/models/paginacao-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ClientesControllerService } from 'app/core/services/controllers/clientes-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ClientesComponent implements OnInit {
    @ViewChild('recentTransactionsTable', { read: MatSort })
    public tabelaOrder: MatSort;
    public tabelaDados: MatTableDataSource<any> = new MatTableDataSource();
    public dados: Array<ClienteDTO> = [];
    public tabelaColunas: string[] = [
        'nome',
        'cpf',
        'celular',
        'telefone',
        'acoes',
    ];

    public temRegistro: boolean = false;
    public filtro: PaginacaoDTO = new PaginacaoDTO(0, 15);
    public podeCarregarMais: boolean = false;

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService,
        private _clientesControllerService: ClientesControllerService
    ) {}

    ngOnInit() {
        this._buscarDados();
    }

    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    public carregarMais(): void {
        this.filtro.skip = this.dados.length;
        this._buscarDados();
    }

    private _buscarDados(): void {
        this._fuseLoadingService.show();
        this._clientesControllerService
            .listar(this.filtro.skip, this.filtro.take)
            .subscribe(
                (res) => {
                    if (!res.sucesso) {
                        this._toastService.mensagemError(
                            'Erro ao listar: ' + res.mensagem
                        );
                        return;
                    }
                    this._fuseLoadingService.hide();
                    if (this.filtro.skip === 0) {
                        this.dados = res.clientes;
                    } else {
                        this.dados = this.dados.concat(...res.clientes);
                    }
                    this.podeCarregarMais = res.carregarMais;
                    this.tabelaDados.data = this.dados;
                    this.temRegistro = res.clientes.length > 0;
                    this.tabelaDados.sort = this.tabelaOrder;
                },
                (erro) => {
                    this._toastService.mensagemError(
                        'Erro ao listar: ' + erro.error
                    );
                    console.log(erro);
                    this._fuseLoadingService.hide();
                }
            );
    }

    public modalNovo(): void {
        const dialogRef = this._matDialog.open(CadastrarClientesComponent, {
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
                this._buscarDados();
            }
        });
    }

    public modalAlterar(item: ClienteDTO): void {
        const dialogRef = this._matDialog.open(CadastrarClientesComponent, {
            width: window.innerWidth < 600 ? '95%' : 'auto',
            maxWidth: window.innerWidth < 600 ? '99vw' : 'auto',
            autoFocus: false,
            disableClose: true,
            data: {
                verbo: VerbosHTTP.PUT,
                dados: item,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._buscarDados();
            }
        });
    }
}
