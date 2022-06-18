import { Overlay } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_AUTOCOMPLETE_SCROLL_STRATEGY } from '@angular/material/autocomplete';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { MY_FORMATS } from 'app/core/functions/date-format';
import { scrollFactory } from 'app/core/functions/scroll-factory';
import { Enderecos } from 'app/core/models/endereco';
import { ExcursaoDTO } from 'app/core/models/excursoes/excursao-dto';
import { OnibusMotoristaExcursao } from 'app/core/models/excursoes/onibus-motorista-excursao';
import { MotoristaDTO } from 'app/core/models/motoristas/motorista-dto';
import { OnibusDTO } from 'app/core/models/onibus/onibus-dto';
import { ExcursoesControllerService } from 'app/core/services/controllers/excursoes-controller.service';
import { MotoristasControllerService } from 'app/core/services/controllers/motoristas-controller.service';
import { OnibusControllerService } from 'app/core/services/controllers/onibus-controller.service';
import { ToastService } from 'app/core/services/toast.service';
import { ViacepService } from 'app/core/services/viacep.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
    selector: 'app-cadastrar-excursao',
    templateUrl: './cadastrar-excursao.component.html',
    styleUrls: ['./cadastrar-excursao.component.scss'],
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
export class CadastrarExcursaoComponent implements OnInit {
    public form: FormGroup;
    public formDestino: FormGroup;
    public formSaida: FormGroup;

    public motoristas: Array<MotoristaDTO> = new Array<MotoristaDTO>();
    public onibus: Array<OnibusDTO> = new Array<OnibusDTO>();
    myControlOnibus = new FormControl();
    myControlMotorista = new FormControl();
    filteredMoto: Observable<MotoristaDTO[]>;
    filteredOni: Observable<OnibusDTO[]>;
    public selecionadoOnibusMotoristas: Array<{
        onibus: OnibusDTO;
        motorista: MotoristaDTO;
    }> = new Array<{
        onibus: OnibusDTO;
        motorista: MotoristaDTO;
    }>();

    constructor(
        private _formBuilder: FormBuilder,
        private _toastService: ToastService,
        private viacep: ViacepService,
        private _fuseLoadingService: FuseLoadingBarService,
        private _motoristasControllerService: MotoristasControllerService,
        private _onibusControllerService: OnibusControllerService,
        private _excursoesControllerService: ExcursoesControllerService,
        private _router: Router
    ) {}

    ngOnInit() {
        this._buscarMotoristas();
        this._buscarOnibus();
        this.filteredMoto = this.myControlMotorista.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterMoto(value.nome || ''))
        );
        this.filteredOni = this.myControlOnibus.valueChanges.pipe(
            startWith(''),
            map((value) => this._filterOnibus(value.nome || ''))
        );

        this.form = this._formBuilder.group({
            step1: this._formBuilder.group({
                nome: [null, [Validators.required]],
                dataIncio: [null, Validators.required],
                dataFim: [null, Validators.required],
                dataSaida: [null, Validators.required],
                dataRetorno: [null, Validators.required],
                horaEmbarque: [null],
                horaRetorno: [null],
            }),
            step2: this._formBuilder.group({
                enderecoDestino: [null],
                enderecoSaida: [null],
            }),
            step3: this._formBuilder.group({
                valorAdulto: [null, Validators.required],
                valorInfantil: [null, Validators.required],
                considerarCrianca: [6, Validators.required],
                itinerario: [null],
                observacoes: [null],
            }),
            step4: this._formBuilder.group({
                onibusMotoristas: [null],
            }),
            step5: this._formBuilder.group({
                contrato: [null],
            }),
        });
        this.formDestino = this._formBuilder.group({
            logradouro: [
                null,
                [Validators.maxLength(255), Validators.required],
            ],
            uf: [null, [Validators.maxLength(10), Validators.required]],
            bairro: [null, [Validators.maxLength(255), Validators.required]],
            cep: ['', [Validators.maxLength(30), Validators.required]],
            cidade: [null, [Validators.maxLength(255), Validators.required]],
            complemento: [null, [Validators.maxLength(255)]],
            numero: [null, [Validators.maxLength(20), Validators.required]],
        });
        this.formSaida = this._formBuilder.group({
            logradouro: [
                null,
                [Validators.maxLength(255), Validators.required],
            ],
            uf: [null, [Validators.maxLength(10), Validators.required]],
            bairro: [null, [Validators.maxLength(255), Validators.required]],
            cep: ['', [Validators.maxLength(30), Validators.required]],
            cidade: [null, [Validators.maxLength(255), Validators.required]],
            complemento: [null, [Validators.maxLength(255)]],
            numero: [null, [Validators.maxLength(20), Validators.required]],
        });

        this.formSaida.valueChanges.subscribe((e) => {
            this.setEnderecosFormPrincipal();
        });
        this.formDestino.valueChanges.subscribe((e) => {
            this.setEnderecosFormPrincipal();
        });
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

    private _buscarOnibus(): void {
        this._fuseLoadingService.show();
        this._onibusControllerService.listar(0, 1000, '').subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao listar: ' + res.mensagem
                    );
                    return;
                }
                this._fuseLoadingService.hide();
                this.onibus = res.onibus;
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

    private _buscarMotoristas(): void {
        this._fuseLoadingService.show();
        this._motoristasControllerService.listar(0, 1000, '').subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao listar: ' + res.mensagem
                    );
                    return;
                }
                this._fuseLoadingService.hide();
                this.motoristas = res.motoristas;
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

    private _filterMoto(value: string): MotoristaDTO[] {
        const filterValue = value.toLowerCase();
        return this.motoristas.filter((option) =>
            option.nome.toLowerCase().includes(filterValue)
        );
    }

    private _filterOnibus(value: string): OnibusDTO[] {
        const filterValue = value.toLowerCase();
        return this.onibus.filter((option) =>
            option.nome.toLowerCase().includes(filterValue)
        );
    }

    public displayMotorista(item: MotoristaDTO): string {
        return item && item.nome ? item.nome : '';
    }

    public displayOnibus(item: OnibusDTO): string {
        return item && item.nome ? item.nome : '';
    }

    public setMotoristaOnibus(): void {
        const motorista = this.myControlMotorista.value as MotoristaDTO;
        const onibus = this.myControlOnibus.value as OnibusDTO;
        let hasMoto =
            this.selecionadoOnibusMotoristas.filter(
                (e) => e.motorista.codigo == motorista.codigo
            ).length > 0;

        let hasOnibus =
            this.selecionadoOnibusMotoristas.filter(
                (e) => e.onibus.codigo == onibus.codigo
            ).length > 0;

        if (!hasOnibus && !hasMoto) {
            let item = {
                onibus: onibus,
                motorista: motorista,
            };
            this.selecionadoOnibusMotoristas.push(item);
            return;
        }

        if (hasMoto) {
            this._toastService.mensagemWarning('Motorista já selecionado!');
        }
        if (hasOnibus) {
            this._toastService.mensagemWarning('Ônibus já selecionado!');
        }
    }

    public removerMotoristaOnibus(item: any): void {
        this.selecionadoOnibusMotoristas =
            this.selecionadoOnibusMotoristas.filter((e) => e != item);
    }

    public salvar(): void {
        console.log(this._montarObjeto);

        this._fuseLoadingService.show();
        this._excursoesControllerService
            .cadastrar(this._montarObjeto)
            .subscribe(
                (res) => {
                    if (!res.sucesso) {
                        this._toastService.mensagemError(
                            'Erro ao cadastrar: ' + res.mensagem
                        );
                        return;
                    }
                    this._toastService.mensagemSuccess(
                        'Excursão cadastrada com sucesso!'
                    );
                    this._fuseLoadingService.hide();
                    this._router.navigateByUrl('/excursoes');
                },
                (erro) => {
                    this._toastService.mensagemError(
                        'Erro ao cadastrar: ' + erro.error
                    );
                    console.log(erro);
                    this._fuseLoadingService.hide();
                }
            );
    }

    private get _montarObjeto(): ExcursaoDTO {
        this._colocarHoraNaData();
        let motoristasOnibus = new Array<OnibusMotoristaExcursao>();
        this.selecionadoOnibusMotoristas.forEach((e) => {
            motoristasOnibus.push({
                onibusId: e.onibus.id,
                motoristasId: e.motorista.id,
            });
        });
        let dados: ExcursaoDTO = {
            considerarCrianca: this.form.get('step3').get('considerarCrianca')
                .value,
            valorAdulto: this.form.get('step3').get('valorAdulto').value,
            valorInfantil: this.form.get('step3').get('valorInfantil').value,
            itinerario: this.form.get('step3').get('itinerario').value,
            observacoes: this.form.get('step3').get('observacoes').value,
            enderecoDestino: this.form.get('step2').get('enderecoDestino')
                .value,
            enderecoSaida: this.form.get('step2').get('enderecoSaida').value,
            nome: this.form.get('step1').get('nome').value,
            dataFim: this.form.get('step1').get('dataFim').value,
            dataIncio: this.form.get('step1').get('dataIncio').value,
            dataRetorno: this.form.get('step1').get('dataRetorno').value,
            dataSaida: this.form.get('step1').get('dataSaida').value,
            codigo: null,
            onibusMotoristas: motoristasOnibus,
            contrato: this.form.get('step5').get('contrato').value,
        };

        return dados;
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
    }
}
