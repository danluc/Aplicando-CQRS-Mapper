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

    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this._formBuilder.group({
            step1: this._formBuilder.group({
                nome: [null, [Validators.required]],
                dataIncio: [null, Validators.required],
                dataFim: [null, Validators.required],
                dataSaida: [null, Validators.required],
                dataRetorno: [null, Validators.required],
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
}
