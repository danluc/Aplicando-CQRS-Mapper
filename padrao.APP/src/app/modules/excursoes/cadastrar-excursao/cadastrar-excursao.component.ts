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
import { MY_FORMATS } from 'app/core/functions/date-format';
import { scrollFactory } from 'app/core/functions/scroll-factory';
import { ToastService } from 'app/core/services/toast.service';

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

    constructor(
        private _formBuilder: FormBuilder,
        private _toastService: ToastService
    ) {}

    ngOnInit() {
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
                valorAdulto: [null, Validators.required],
                valorInfantil: [null, Validators.required],
                considerarCrianca: [null, Validators.required],
            }),
            step3: this._formBuilder.group({
                enderecoDestino: [null],
                enderecoSaida: [null],
            }),
            step4: this._formBuilder.group({
                onibusMotoristas: [null],
            }),
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
}
