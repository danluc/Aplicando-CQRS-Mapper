import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { OnibusDTO } from 'app/core/models/onibus/onibus-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { OnibusControllerService } from 'app/core/services/controllers/onibus-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-cadastrar-carro',
    templateUrl: './cadastrar-carro.component.html',
    styleUrls: ['./cadastrar-carro.component.scss'],
})
export class CadastrarCarroComponent implements OnInit {
    public form: FormGroup;
    public salvando: boolean = false;
    public enumVerbosHTTP: typeof VerbosHTTP = VerbosHTTP;

    constructor(
        public matDialogRef: MatDialogRef<CadastrarCarroComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { dados: OnibusDTO; verbo: VerbosHTTP },
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _onibusControllerService: OnibusControllerService,
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
            placa: [null, [Validators.maxLength(50)]],
            marca: [null, [Validators.maxLength(200)]],
            poltronas: [30, [Validators.maxLength(4), Validators.required]],
            observacao: [null],
        });
    }

    private _formularioAlterar(): void {
        this.form = this._formBuilder.group({
            nome: [
                this.data.dados.nome,
                [Validators.maxLength(200), Validators.required],
            ],
            placa: [this.data.dados.placa],
            marca: [this.data.dados.marca, [Validators.maxLength(200)]],
            poltronas: [
                this.data.dados.poltronas,
                [Validators.maxLength(4), Validators.required],
            ],
            observacao: [
                this.data.dados.observacao,
                [Validators.maxLength(50)],
            ],
        });
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
        let dados = this.form.value as OnibusDTO;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._onibusControllerService.cadastrar(dados).subscribe(
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
        let dados = this.form.value as OnibusDTO;
        dados.codigo = this.data.dados.codigo;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._onibusControllerService.atualizar(dados).subscribe(
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
