import { Component, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
})
export class ClientesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
