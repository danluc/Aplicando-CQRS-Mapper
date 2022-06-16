import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { ExcursaoDTO } from 'app/core/models/excursoes/excursao-dto';
import { PaginacaoDTO } from 'app/core/models/paginacao-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { AuthenticationService } from 'app/core/services/authentication.service';
import { ExcursoesControllerService } from 'app/core/services/controllers/excursoes-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-lista-excursoes',
    templateUrl: './lista-excursoes.component.html',
    styleUrls: ['./lista-excursoes.component.scss'],
})
export class ListaExcursoesComponent implements OnInit {
    public dados: Array<ExcursaoDTO>;
    public temRegistro: boolean = false;
    public filtro: PaginacaoDTO = new PaginacaoDTO(0, 10);
    public podeCarregarMais: boolean = false;
    public inputPesquisar: FormControl = new FormControl();

    constructor(
        private _matDialog: MatDialog,
        private _toastService: ToastService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _authenticationService: AuthenticationService,
        private _excursoesControllerService: ExcursoesControllerService
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
        this._excursoesControllerService
            .listar(this.filtro.skip, this.filtro.take, this.filtro.nomeCpf)
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
                        this.dados = res.excursoes;
                    } else {
                        this.dados = this.dados.concat(...res.excursoes);
                    }
                    this.podeCarregarMais = res.carregarMais;
                    this.temRegistro = res.excursoes.length > 0;
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
}
