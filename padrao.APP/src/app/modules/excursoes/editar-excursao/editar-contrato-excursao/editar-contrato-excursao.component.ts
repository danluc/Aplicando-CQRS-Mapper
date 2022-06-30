import { Component, Inject, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { ExcursaoDTO } from 'app/core/models/excursoes/excursao-dto';
import { ConfigEditorTextoContratoService } from 'app/core/services/config-editor-contrato.service';
import { ExcursoesControllerService } from 'app/core/services/controllers/excursoes-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-editar-contrato-excursao',
    templateUrl: './editar-contrato-excursao.component.html',
    styleUrls: ['./editar-contrato-excursao.component.scss'],
})
export class EditarContratoExcursaoComponent implements OnInit {
    public configuracoesEditor: object;
    public formEditor: FormGroup;
    public controlEditor = new FormControl();
    public salvando: boolean = false;
    constructor(
        public matDialogRef: MatDialogRef<EditarContratoExcursaoComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: ExcursaoDTO,
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _excursoesControllerService: ExcursoesControllerService,
        private _configContratoService: ConfigEditorTextoContratoService
    ) {}

    ngOnInit() {
        this.configuracoesEditor =
            this._configContratoService.configuracaoPadraoEditor();
        this.formEditor = this._formBuilder.group({
            contrato: [this.data.contrato, [Validators.required]],
        });
    }

    public salvar(): void {
        this._fuseLoadingService.show();
        this.data.contrato = this.formEditor.get('contrato').value;
        this.salvando = true;
        this._excursoesControllerService.atualizar(this.data).subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao atualizar: ' + res.mensagem
                    );
                    this.salvando = false;
                    return;
                }
                this._toastService.mensagemSuccess(
                    'Excursão atualizada com sucesso!'
                );
                this._fuseLoadingService.hide();
                this.matDialogRef.close(true);
            },
            (erro) => {
                this.salvando = false;
                this._toastService.mensagemError(
                    'Erro ao atualizar: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }
}
