import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { MotoristaDTO } from 'app/core/models/motoristas/motorista-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { MotoristasControllerService } from 'app/core/services/controllers/motoristas-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-cadastrar-motorista',
    templateUrl: './cadastrar-motorista.component.html',
    styleUrls: ['./cadastrar-motorista.component.scss'],
})
export class CadastrarMotoristaComponent implements OnInit {
    public form: FormGroup;
    public salvando: boolean = false;
    public enumVerbosHTTP: typeof VerbosHTTP = VerbosHTTP;

    constructor(
        public matDialogRef: MatDialogRef<CadastrarMotoristaComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { dados: MotoristaDTO; verbo: VerbosHTTP },
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _motoristasControllerService: MotoristasControllerService,
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
            telefone: [null, [Validators.maxLength(50)]],
            celular: [null, [Validators.maxLength(50), Validators.required]],
            observacao: [null, [Validators.maxLength(50)]],
        });
    }

    private _formularioAlterar(): void {
        this.form = this._formBuilder.group({
            nome: [
                this.data.dados.nome,
                [Validators.maxLength(200), Validators.required],
            ],
            telefone: [this.data.dados.telefone, [Validators.maxLength(50)]],
            celular: [
                this.data.dados.celular,
                [Validators.maxLength(50), Validators.required],
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
        let dados = this.form.value as MotoristaDTO;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._motoristasControllerService.cadastrar(dados).subscribe(
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
        let dados = this.form.value as MotoristaDTO;
        dados.codigo = this.data.dados.codigo;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._motoristasControllerService.atualizar(dados).subscribe(
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
