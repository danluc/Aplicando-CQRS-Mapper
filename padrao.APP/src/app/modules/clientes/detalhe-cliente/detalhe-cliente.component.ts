import { OverlayRef } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { obterIdadeEmAnosMesesDias } from 'app/core/functions/idade';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { ClientesControllerService } from 'app/core/services/controllers/clientes-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { Subject } from 'rxjs';
import { CadastrarClientesComponent } from '../cadastrar-clientes/cadastrar-clientes.component';
import { ListaContatosComponent } from '../lista-contatos/lista-contatos.component';

@Component({
    selector: 'app-detalhe-cliente',
    templateUrl: './detalhe-cliente.component.html',
    styleUrls: ['./detalhe-cliente.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetalheClienteComponent implements OnInit {
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    public cliente: ClienteDTO;
    public codigo: string;
    public mostrar: boolean = false;
    public idade: string = '';
    public viagens: any = [];

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _listaContatosComponent: ListaContatosComponent,
        private _viewContainerRef: ViewContainerRef,
        private _fuseLoadingService: FuseLoadingBarService,
        private _clientesControllerService: ClientesControllerService,
        private _toastService: ToastService,
        private _matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.codigo =
            this._activatedRoute.snapshot.paramMap.get('codigo') || null;
        if (!this.codigo) {
            this._toastService.mensagemError('Parametro não recebido!');
            this.ngOnDestroy();
        }
        this._buscarDados();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.closeDrawer();
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    public closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listaContatosComponent.matDrawer.close();
    }

    private _buscarDados(): void {
        this._fuseLoadingService.show();
        this._clientesControllerService.selecionar(this.codigo).subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao listar: ' + res.mensagem
                    );
                    this.ngOnDestroy();
                    return;
                }
                this.mostrar = true;
                this.cliente = res.cliente;
                this.idade = obterIdadeEmAnosMesesDias(
                    this.cliente.dataNascimento
                );
                this._listaContatosComponent.matDrawer.open();
                this._fuseLoadingService.hide();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao listar: ' + erro.error
                );
                console.log(erro);
                this.ngOnDestroy();
                this._fuseLoadingService.hide();
            }
        );
    }

    public modalAlterar(item: ClienteDTO): void {
        const dialogRef = this._matDialog.open(CadastrarClientesComponent, {
            width: window.innerWidth < 600 ? '95%' : 'auto',
            maxWidth: window.innerWidth < 600 ? '99vw' : 'auto',
            autoFocus: false,
            disableClose: true,
            data: {
                verbo: VerbosHTTP.PUT,
                dados: this.cliente,
            },
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                this._buscarDados();
            }
        });
    }
}
