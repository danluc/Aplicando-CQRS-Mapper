import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { MY_FORMATS } from 'app/core/functions/date-format';
import { scrollFactory } from 'app/core/functions/scroll-factory';
import { Enderecos } from 'app/core/models/endereco';
import { ExcursaoDTO } from 'app/core/models/excursoes/excursao-dto';
import { ExcursoesControllerService } from 'app/core/services/controllers/excursoes-controller.service';
import { MotoristasControllerService } from 'app/core/services/controllers/motoristas-controller.service';
import { OnibusControllerService } from 'app/core/services/controllers/onibus-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { ViacepService } from 'app/core/services/viacep.service';

@Component({
    selector: 'app-editar-excursao',
    templateUrl: './editar-excursao.component.html',
    styleUrls: ['./editar-excursao.component.scss'],
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
export class EditarExcursaoComponent implements OnInit {
    public form: FormGroup;
    public formDestino: FormGroup;
    public formSaida: FormGroup;
    public formEditor: FormGroup;
    public codigo: string;
    public excursao: ExcursaoDTO;
    public mostrarFormulario: boolean = false;

    constructor(
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private viacep: ViacepService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _excursoesControllerService: ExcursoesControllerService,
        private _router: Router,
        private _activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.codigo =
            this._activatedRoute.snapshot.paramMap.get('codigo') || null;
        if (!this.codigo) {
            this._toastService.mensagemError('Parametro não recebido!');
        }
        this.buscarExcursao();
    }

    private buscarExcursao(): void {
        this._fuseLoadingService.show();
        this._excursoesControllerService.selecionar(this.codigo).subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao buscar excursão: ' + res.mensagem
                    );
                    return;
                }
                this.excursao = res.excursao;
                this.formulario();
            },
            (erro) => {
                this._toastService.mensagemError(
                    'Erro ao buscar excursão: ' + erro.error
                );
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    private tratarHr(minute: number): string {
        return minute == 0 ? '00' : minute.toString();
    }

    private formulario(): void {
        const dataRetorno = new Date(this.excursao.dataRetorno);
        const dataSaida = new Date(this.excursao.dataSaida);
        this.form = this._formBuilder.group({
            step1: this._formBuilder.group({
                nome: [this.excursao.nome, [Validators.required]],
                dataIncio: [this.excursao.dataIncio, Validators.required],
                dataFim: [this.excursao.dataFim, Validators.required],
                dataSaida: [this.excursao.dataSaida, Validators.required],
                dataRetorno: [this.excursao.dataRetorno, Validators.required],
                horaEmbarque: [
                    `${dataSaida.getHours()}:${this.tratarHr(
                        dataSaida.getMinutes()
                    )}`,
                ],
                horaRetorno: [
                    `${dataRetorno.getHours()}:${this.tratarHr(
                        dataRetorno.getMinutes()
                    )}`,
                ],
            }),
            step2: this._formBuilder.group({
                enderecoDestino: [this.excursao.enderecoDestino],
                enderecoSaida: [this.excursao.enderecoSaida],
            }),
            step3: this._formBuilder.group({
                valorAdulto: [this.excursao.valorAdulto, Validators.required],
                valorInfantil: [
                    this.excursao.valorInfantil,
                    Validators.required,
                ],
                considerarCrianca: [
                    this.excursao.considerarCrianca,
                    Validators.required,
                ],
                itinerario: [this.excursao.itinerario],
                observacoes: [this.excursao.observacoes],
            }),
        });
        this.formDestino = this._formBuilder.group({
            logradouro: [
                this.excursao.enderecoDestino.logradouro,
                [Validators.maxLength(255), Validators.required],
            ],
            uf: [
                this.excursao.enderecoDestino.uf,
                [Validators.maxLength(10), Validators.required],
            ],
            bairro: [
                this.excursao.enderecoDestino.bairro,
                [Validators.maxLength(255), Validators.required],
            ],
            cep: [
                this.excursao.enderecoDestino.cep,
                [Validators.maxLength(30), Validators.required],
            ],
            cidade: [
                this.excursao.enderecoDestino.cidade,
                [Validators.maxLength(255), Validators.required],
            ],
            complemento: [null, [Validators.maxLength(255)]],
            numero: [
                this.excursao.enderecoDestino.numero,
                [Validators.maxLength(20), Validators.required],
            ],
        });
        this.formSaida = this._formBuilder.group({
            logradouro: [
                this.excursao.enderecoSaida.logradouro,
                [Validators.maxLength(255), Validators.required],
            ],
            uf: [
                this.excursao.enderecoSaida.uf,
                [Validators.maxLength(10), Validators.required],
            ],
            bairro: [
                this.excursao.enderecoSaida.bairro,
                [Validators.maxLength(255), Validators.required],
            ],
            cep: [
                this.excursao.enderecoSaida.cep,
                [Validators.maxLength(30), Validators.required],
            ],
            cidade: [
                this.excursao.enderecoSaida.cidade,
                [Validators.maxLength(255), Validators.required],
            ],
            complemento: [null, [Validators.maxLength(255)]],
            numero: [
                this.excursao.enderecoSaida.numero,
                [Validators.maxLength(20), Validators.required],
            ],
        });

        this.formSaida.valueChanges.subscribe((e) => {
            this.setEnderecosFormPrincipal();
        });
        this.formDestino.valueChanges.subscribe((e) => {
            this.setEnderecosFormPrincipal();
        });
        this.mostrarFormulario = true;
    }

    public setDatasSelecionadas(): void {
        const dataInicio = this.form.get('step1').get('dataIncio');
        const dataFim = this.form.get('step1').get('dataFim');
        const dataSaida = this.form.get('step1').get('dataSaida');
        const dataRetorno = this.form.get('step1').get('dataRetorno');
        //Validar data saida
        if (dataInicio.value != null && dataSaida.value == null) {
            let dataS = new Date(dataInicio.value);
            dataSaida.setValue(new Date(dataS.getTime() - 86400000));
        } else if (
            dataInicio.value != null &&
            new Date(dataInicio.value).getTime() <
                new Date(dataSaida.value).getTime()
        ) {
            let dataS = new Date(dataInicio.value);
            dataSaida.setValue(new Date(dataS.getTime()));
        }
        //Validar data retorno
        if (dataFim.value != null && dataRetorno.value == null) {
            let dataF = new Date(dataFim.value);
            dataRetorno.setValue(new Date(dataF.getTime()));
        } else if (
            dataFim.value != null &&
            new Date(dataFim.value).getTime() <
                new Date(dataRetorno.value).getTime()
        ) {
            let dataF = new Date(dataFim.value);
            dataRetorno.setValue(new Date(dataF.getTime()));
        } else if (
            new Date(dataFim.value).getTime() >
            new Date(dataRetorno.value).getTime()
        ) {
            let dataF = new Date(dataFim.value);
            dataRetorno.setValue(new Date(dataF.getTime()));
        }
    }

    public validarDataSaida(): boolean {
        const dataInicio = this.form.get('step1').get('dataIncio');
        const dataSaida = this.form.get('step1').get('dataSaida');
        if (dataInicio.value != null && dataSaida.value != null) {
            if (
                new Date(dataInicio.value).getTime() <
                new Date(dataSaida.value).getTime()
            ) {
                this._toastService.mensagemWarning(
                    'Data saída maior que a data ínicio.'
                );
                let dataF = new Date(dataInicio.value);
                dataSaida.setValue(new Date(dataF.getTime()));
                return false;
            }
        }
        return true;
    }

    public validarDataRetorno(): boolean {
        const dataFim = this.form.get('step1').get('dataFim');
        const dataRetorno = this.form.get('step1').get('dataRetorno');
        if (dataFim.value != null && dataRetorno.value != null) {
            if (
                new Date(dataFim.value).getTime() >
                new Date(dataRetorno.value).getTime()
            ) {
                this._toastService.mensagemWarning(
                    'Data retorno menor que a data fim.'
                );
                let dataF = new Date(dataFim.value);
                dataRetorno.setValue(new Date(dataF.getTime()));
                return false;
            }
        }
        return true;
    }

    public buscarPorCepDestino(): void {
        var cep = this.formDestino.get('cep').value as string;
        if (cep.length < 8 || cep.length > 8) {
            return;
        }
        this._fuseLoadingService.show();
        this.viacep.buscarPorViaCep(cep).subscribe(
            (res) => {
                this.formDestino.get('bairro').setValue(res.bairro);
                this.formDestino.get('uf').setValue(res.uf);
                this.formDestino.get('logradouro').setValue(res.logradouro);
                this.formDestino.get('cidade').setValue(res.localidade);
                this._fuseLoadingService.hide();
            },
            (erro) => {
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    public buscarPorCepSaida(): void {
        var cep = this.formSaida.get('cep').value as string;
        if (cep.length < 8 || cep.length > 8) {
            return;
        }
        this._fuseLoadingService.show();
        this.viacep.buscarPorViaCep(cep).subscribe(
            (res) => {
                this.formSaida.get('bairro').setValue(res.bairro);
                this.formSaida.get('uf').setValue(res.uf);
                this.formSaida.get('logradouro').setValue(res.logradouro);
                this.formSaida.get('cidade').setValue(res.localidade);
                this._fuseLoadingService.hide();
            },
            (erro) => {
                console.log(erro);
                this._fuseLoadingService.hide();
            }
        );
    }

    public setEnderecosFormPrincipal(): void {
        const destino = this.formDestino.value as Enderecos;
        if (destino.uf != null) {
            this.form.get('step2').get('enderecoDestino').setValue(destino);
        }
        const saida = this.formSaida.value as Enderecos;
        if (saida.uf != null) {
            this.form.get('step2').get('enderecoSaida').setValue(saida);
        }
    }

    public salvar(): void {
        this._fuseLoadingService.show();
        this._colocarHoraNaData();
        setTimeout(() => {
            console.log(this.excursao);
            this._excursoesControllerService.atualizar(this.excursao).subscribe(
                (res) => {
                    if (!res.sucesso) {
                        this._toastService.mensagemError(
                            'Erro ao atualizar: ' + res.mensagem
                        );
                        return;
                    }
                    this._toastService.mensagemSuccess(
                        'Excursão atualizada com sucesso!'
                    );
                    this._fuseLoadingService.hide();
                    this._router.navigateByUrl('/excursoes');
                },
                (erro) => {
                    this._toastService.mensagemError(
                        'Erro ao atualizar: ' + erro.error
                    );
                    console.log(erro);
                    this._fuseLoadingService.hide();
                }
            );
        }, 500);
    }

    private _colocarHoraNaData(): void {
        let dRetorno = new Date(
            this.form.get('step1').get('dataRetorno').value
        );
        let horaRetorno = this.form
            .get('step1')
            .get('horaRetorno')
            .value.split(':');
        dRetorno.setHours(horaRetorno[0], horaRetorno[1]);
        this.form.get('step1').get('dataRetorno').setValue(dRetorno);
        let dSaida = new Date(this.form.get('step1').get('dataSaida').value);
        let horaSaida = this.form
            .get('step1')
            .get('horaEmbarque')
            .value.split(':');
        dSaida.setHours(horaSaida[0], horaSaida[1]);
        this.form.get('step1').get('dataSaida').setValue(dSaida);
        this.montarDTOExcursao();
    }

    private montarDTOExcursao(): void {
        const dataRetorno = this.form.get('step1').get('dataRetorno').value;
        const dataSaida = this.form.get('step1').get('dataSaida').value;
        this.excursao.nome = this.form.get('step1').get('nome').value;
        this.excursao.dataIncio = this.form.get('step1').get('dataIncio').value;
        this.excursao.dataFim = this.form.get('step1').get('dataFim').value;
        this.excursao.dataSaida = new Date(dataSaida);
        this.excursao.dataRetorno = new Date(dataRetorno);
        this.excursao.enderecoDestino = this.form
            .get('step2')
            .get('enderecoDestino').value;
        this.excursao.enderecoSaida = this.form
            .get('step2')
            .get('enderecoSaida').value;
        this.excursao.valorAdulto = this.form
            .get('step3')
            .get('valorAdulto').value;
        this.excursao.valorInfantil = this.form
            .get('step3')
            .get('valorInfantil').value;
        this.excursao.itinerario = this.form
            .get('step3')
            .get('itinerario').value;
        this.excursao.observacoes = this.form
            .get('step3')
            .get('observacoes').value;
        this.excursao.considerarCrianca = this.form
            .get('step3')
            .get('considerarCrianca').value;
    }
}
