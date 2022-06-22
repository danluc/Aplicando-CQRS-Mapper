import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { configuracaoPadraoEditor } from 'app/core/functions/configuracao-editor-texto';

@Component({
    selector: 'app-contrato-viagem',
    templateUrl: './contrato-viagem.component.html',
    styleUrls: ['./contrato-viagem.component.scss'],
})
export class ContratoViagemComponent implements OnInit {
    public configuracoesEditor: object;
    public formEditor: FormGroup;
    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.formEditor = this._formBuilder.group({
            template: ['', [Validators.required]],
        });
        this.configuracoesEditor = configuracaoPadraoEditor();
        this.formEditor.get('template').setValue('<h1>Teste</h1>');
    }
}
