import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    LOCALE_ID,
    OnDestroy,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { PaginacaoDTO } from 'app/core/models/paginacao-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ClientesControllerService } from 'app/core/services/controllers/clientes-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { Subject } from 'rxjs';
import { CadastrarClientesComponent } from '../cadastrar-clientes/cadastrar-clientes.component';

@Component({
    selector: 'app-lista-contatos',
    templateUrl: './lista-contatos.component.html',
    styleUrls: ['./lista-contatos.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ListaContatosComponent implements OnInit, OnDestroy {
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
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public clienteSelecionado: ClienteDTO;
    public drawerMode: 'side' | 'over';

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService,
        private _clientesControllerService: ClientesControllerService,
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private _fuseMediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit() {
        this._buscarDados();
        this.matDrawer.openedChange.subscribe((opened) => {
            if (!opened) {
                this.clienteSelecionado = null;
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    public trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
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