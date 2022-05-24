import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { MY_FORMATS } from 'app/core/functions/date-format';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { ClientesControllerService } from 'app/core/services/controllers/clientes-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { CadastrarEnderecoComponent } from 'app/modules/components/cadastrar-endereco/cadastrar-endereco.component';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import { scrollFactory } from 'app/core/functions/scroll-factory';

@Component({
    selector: 'app-cadastrar-clientes',
    templateUrl: './cadastrar-clientes.component.html',
    styleUrls: ['./cadastrar-clientes.component.scss'],
    providers: [
        DatePipe,
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE],
        },

        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
        { provide: MAT_DATE_LOCALE, useValue: 'pt' },
        {
            provide: MAT_AUTOCOMPLETE_SCROLL_STRATEGY,
            useFactory: scrollFactory,
            deps: [Overlay],
        },
    ],
})
export class CadastrarClientesComponent implements OnInit {
    public form: FormGroup;
    public salvando: boolean = false;
    public enumVerbosHTTP: typeof VerbosHTTP = VerbosHTTP;
    @ViewChild(CadastrarEnderecoComponent)
    private _cadastrarEnderecoComponent: CadastrarEnderecoComponent;

    constructor(
        public matDialogRef: MatDialogRef<CadastrarClientesComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { dados: ClienteDTO; verbo: VerbosHTTP },
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _clientesControllerService: ClientesControllerService,
        private _fuseLoadingService: FuseLoadingBarService
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
            nome: [null, [Validators.maxLength(200), Validators.required]],
            email: [null, [Validators.email]],
            cpf: [null, [Validators.maxLength(50), Validators.required]],
            rg: [null, [Validators.maxLength(50)]],
            orgEmissor: [null, [Validators.maxLength(50)]],
            telefone: [null, [Validators.maxLength(50)]],
            celular: [null, [Validators.maxLength(50)]],
            dataNascimento: [null, [Validators.maxLength(50)]],
            observacao: [null, [Validators.maxLength(50)]],
        });
    }

    private _formularioAlterar(): void {
        this.form = this._formBuilder.group({
            nome: [
                this.data.dados.nome,
                [Validators.maxLength(200), Validators.required],
            ],
            email: [this.data.dados.email, [Validators.email]],
            cpf: [
                this.data.dados.cpf,
                [Validators.maxLength(50), Validators.required],
            ],
            rg: [this.data.dados.rg, [Validators.maxLength(50)]],
            orgEmissor: [
                this.data.dados.orgEmissor,
                [Validators.maxLength(50)],
            ],
            telefone: [this.data.dados.telefone, [Validators.maxLength(50)]],
            celular: [this.data.dados.celular, [Validators.maxLength(50)]],
            dataNascimento: [
                this.data.dados.dataNascimento,
                [Validators.maxLength(50), Validators.required],
            ],
            observacao: [
                this.data.dados.observacao,
                [Validators.maxLength(50)],
            ],
        });

        setTimeout(() => {
            if (this.data.dados.endereco != null)
                this._cadastrarEnderecoComponent.setDados(
                    this.data.dados.endereco
                );
        }, 300);
    }

    public salvar(): void {
        if (!this.form.valid) {
            this.form.markAsTouched();
            return;
        }

        if (this.data.verbo == VerbosHTTP.POST) {
            this._cadastrar();
        } else {
            this._atualizar();
        }
    }

    private _cadastrar(): void {
        let dados = this.form.value as ClienteDTO;
        if (this._cadastrarEnderecoComponent.form.valid) {
            dados.endereco = this._cadastrarEnderecoComponent.form.value;
        }
        this._fuseLoadingService.show();
        this.salvando = true;
        this._clientesControllerService.cadastrar(dados).subscribe(
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

    private _atualizar(): void {
        let dados = this.form.value as ClienteDTO;
        if (this._cadastrarEnderecoComponent.form.valid) {
            dados.endereco = this._cadastrarEnderecoComponent.form.value;
        }
        dados.codigo = this.data.dados.codigo;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._clientesControllerService.atualizar(dados).subscribe(
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
