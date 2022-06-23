import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { ContratoDTO } from 'app/core/models/contrato/contrato-dto';
import { Empresas } from 'app/core/models/empresas/empresa';
import { ConfigEditorTextoContratoService } from 'app/core/services/config-editor-contrato.service';
import { ContratoControllerService } from 'app/core/services/controllers/contrato-controller.service';
import { EmpresaControllerService } from 'app/core/services/controllers/empresa-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-contrato-viagem',
    templateUrl: './contrato-viagem.component.html',
    styleUrls: ['./contrato-viagem.component.scss'],
})
export class ContratoViagemComponent implements OnInit {
    public configuracoesEditor: object;
    public formEditor: FormGroup;
    public empresa: Empresas = new Empresas();
    public contrato: ContratoDTO = new ContratoDTO();
    public mostrarForm: boolean = false;
    public salvando: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _empresaControllerService: EmpresaControllerService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _toastService: ToastService,
        private _configEditorContratoService: ConfigEditorTextoContratoService,
        private _contratoControllerService: ContratoControllerService
    ) {}

    ngOnInit() {
        this._selecionarEmpresa();
        this._selecionarContrato();
        this.formEditor = this._formBuilder.group({
            contrato: ['', [Validators.required]],
        });
        this.configuracoesEditor =
            this._configEditorContratoService.configuracaoPadraoEditor();
    }

    private _selecionarEmpresa(): void {
        this._fuseLoadingService.show();
        this._empresaControllerService.selecionar().subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao buscar dados: ' + res.mensagem
                    );
                    return;
                }
                this.empresa = res.empresa;
                this._configEditorContratoService.guardaDadosEmpresa(
                    this.empresa
                );
                this.mostrarForm = true;
                this._fuseLoadingService.hide();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao buscar dados: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    private _selecionarContrato(): void {
        this._fuseLoadingService.show();
        this._contratoControllerService.selecionar().subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao buscar dados: ' + res.mensagem
                    );
                    return;
                }
                this.contrato = res.contrato;
                if (
                    this.contrato != null &&
                    this.contrato.contrato.length > 0
                ) {
                    this.formEditor
                        .get('contrato')
                        .setValue(this.contrato.contrato);
                }
                this._fuseLoadingService.hide();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao buscar dados: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    public salvar(): void {
        const iframe: HTMLIFrameElement =
            document.querySelector('editor iframe');
        const body = iframe.contentDocument
            .getElementsByTagName('body')
            .item(0);
        this.formEditor.get('contrato').setValue(body.innerHTML);
        if (this.formEditor.get('contrato').value.length == 0) {
            this._toastService.mensagemError('Nada digitado!');
            return;
        }
        if (this.contrato != null && this.contrato.codigo.length > 0) {
            this.atualizar();
        } else {
            this.cadastrar();
        }
    }

    public cadastrar(): void {
        this.salvando = true;
        this._fuseLoadingService.show();
        let contrato = this.formEditor.get('contrato').value as string;
        this._contratoControllerService.cadastrar(contrato).subscribe(
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
                this.contrato = res.contrato;
                this._fuseLoadingService.hide();
            },
            (err) => {
                console.log(err.error);
                this.salvando = false;
                this._toastService.mensagemError(
                    'Erro ao cadastrar: ' + err.error
                );
                this._fuseLoadingService.hide();
            }
        );
    }

    public atualizar(): void {
        this.salvando = true;
        this._fuseLoadingService.show();
        this.contrato.contrato = this.formEditor.get('contrato').value;
        this._contratoControllerService.atualizar(this.contrato).subscribe(
            (res) => {
                this.salvando = false;
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao atualizar: ' + res.mensagem
                    );
                    return;
                }
                this._toastService.mensagemSuccess(
                    'Dados atualizado com sucesso!'
                );
                this._fuseLoadingService.hide();
            },
            (err) => {
                console.log(err.error);
                this.salvando = false;
                this._toastService.mensagemError(
                    'Erro ao atualizar: ' + err.error
                );
                this._fuseLoadingService.hide();
            }
        );
    }
}
