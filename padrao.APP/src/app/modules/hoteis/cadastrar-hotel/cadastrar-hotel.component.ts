import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { HotelDTO } from 'app/core/models/hoteis/hotel-dto';
import { VerbosHTTP } from 'app/core/models/usuarios/enums/verbos-http';
import { HotelControllerService } from 'app/core/services/controllers/hotel-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { CadastrarEnderecoComponent } from 'app/modules/components/cadastrar-endereco/cadastrar-endereco.component';

@Component({
    selector: 'app-cadastrar-hotel',
    templateUrl: './cadastrar-hotel.component.html',
    styleUrls: ['./cadastrar-hotel.component.scss'],
})
export class CadastrarHotelComponent implements OnInit {
    public form: FormGroup;
    public salvando: boolean = false;
    public enumVerbosHTTP: typeof VerbosHTTP = VerbosHTTP;
    @ViewChild(CadastrarEnderecoComponent)
    private _cadastrarEnderecoComponent: CadastrarEnderecoComponent;

    constructor(
        public matDialogRef: MatDialogRef<CadastrarHotelComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { dados: HotelDTO; verbo: VerbosHTTP },
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _hotelControllerService: HotelControllerService,
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
            contato: [null, [Validators.maxLength(50)]],
            observacao: [null, [Validators.maxLength(50)]],
        });
    }

    private _formularioAlterar(): void {
        this.form = this._formBuilder.group({
            nome: [
                this.data.dados.nome,
                [Validators.maxLength(255), Validators.required],
            ],
            telefone: [this.data.dados.telefone, [Validators.maxLength(50)]],
            contato: [this.data.dados.contato, [Validators.maxLength(255)]],
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
        let dados = this.form.value as HotelDTO;
        if (this._cadastrarEnderecoComponent.form.valid) {
            dados.endereco = this._cadastrarEnderecoComponent.form.value;
        }
        this._fuseLoadingService.show();
        this.salvando = true;
        this._hotelControllerService.cadastrar(dados).subscribe(
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
        let dados = this.form.value as HotelDTO;
        if (this._cadastrarEnderecoComponent.form.valid) {
            dados.endereco = this._cadastrarEnderecoComponent.form.value;
        }
        dados.codigo = this.data.dados.codigo;
        this._fuseLoadingService.show();
        this.salvando = true;
        this._hotelControllerService.atualizar(dados).subscribe(
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
