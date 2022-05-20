import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Enderecos } from 'app/core/models/endereco';

@Component({
    selector: 'app-cadastrar-endereco',
    templateUrl: './cadastrar-endereco.component.html',
    styleUrls: ['./cadastrar-endereco.component.scss'],
})
export class CadastrarEnderecoComponent implements OnInit {
    public form: FormGroup;
    constructor(private _formBuilder: FormBuilder) {}

    ngOnInit() {
        this.form = this._formBuilder.group({
            logradouro: [
                null,
                [Validators.maxLength(255), Validators.required],
            ],
            uf: [null, [Validators.maxLength(10), Validators.required]],
            bairro: [null, [Validators.maxLength(255), Validators.required]],
            cep: [null, [Validators.maxLength(30), Validators.required]],
            cidade: [null, [Validators.maxLength(255), Validators.required]],
            complemento: [null, [Validators.maxLength(255)]],
            numero: [null, [Validators.maxLength(20), Validators.required]],
        });
    }

    public setDados(item: Enderecos): void {
        this.form.get('logradouro').setValue(item.logradouro);
        this.form.get('uf').setValue(item.uf);
        this.form.get('bairro').setValue(item.bairro);
        this.form.get('cep').setValue(item.cep);
        this.form.get('cidade').setValue(item.cidade);
        this.form.get('complemento').setValue(item.complemento);
        this.form.get('numero').setValue(item.numero);
    }
}
