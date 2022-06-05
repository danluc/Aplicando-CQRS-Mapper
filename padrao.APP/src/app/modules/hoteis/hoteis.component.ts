import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { HotelDTO } from 'app/core/models/hoteis/hotel-dto';
import { PaginacaoDTO } from 'app/core/models/paginacao-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { HotelControllerService } from 'app/core/services/controllers/hotel-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { CadastrarHotelComponent } from './cadastrar-hotel/cadastrar-hotel.component';

@Component({
    selector: 'app-hoteis',
    templateUrl: './hoteis.component.html',
    styleUrls: ['./hoteis.component.scss'],
})
export class HoteisComponent implements OnInit {
    public dados: Array<HotelDTO>;
    public temRegistro: boolean = false;
    public filtro: PaginacaoDTO = new PaginacaoDTO(0, 10);
    public podeCarregarMais: boolean = false;
    public inputPesquisar: FormControl = new FormControl();

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService,
        private _hotelControllerService: HotelControllerService
    ) {}

    ngOnInit() {
        this._buscarDados();
    }

    public trackByFn(index: number, item: any): any {
        return item.nome || index;
    }

    public carregarMais(): void {
        this.filtro.skip = this.dados.length;
        this._buscarDados();
    }

    public pesquisarNome(): void {
        if (this.inputPesquisar.value.length == 0) {
            return;
        }
        this.filtro.nomeCpf = this.inputPesquisar.value;
        this._buscarDados();
        this.inputPesquisar.valueChanges.subscribe((val) => {
            if (val.length == 0) {
                this.filtro.nomeCpf = '';
                this._buscarDados();
            }
        });
    }

    private _buscarDados(): void {
        this._fuseLoadingService.show();
        this._hotelControllerService
            .listar(this.filtro.skip, this.filtro.take, this.filtro.nomeCpf)
            .subscribe(
                (res) => {
                    if (!res.sucesso) {
                        this._toastService.mensagemError(
                            'Erro ao listar: ' + res.mensagem
                        );
                        this.dados = [];
                        return;
                    }
                    this._fuseLoadingService.hide();
                    if (this.filtro.skip === 0) {
                        this.dados = res.hotel;
                    } else {
                        this.dados = this.dados.concat(...res.hotel);
                    }
                    this.podeCarregarMais = res.carregarMais;
                    this.temRegistro = res.hotel.length > 0;
                },
                (erro) => {
                    this._toastService.mensagemError(
                        'Erro ao listar: ' + erro.error
                    );
                    console.log(erro);
                    this.dados = [];
                    this._fuseLoadingService.hide();
                }
            );
    }

    public modalNovo(): void {
        const dialogRef = this._matDialog.open(CadastrarHotelComponent, {
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

    public modalAlterar(item: HotelDTO): void {
        const dialogRef = this._matDialog.open(CadastrarHotelComponent, {
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
