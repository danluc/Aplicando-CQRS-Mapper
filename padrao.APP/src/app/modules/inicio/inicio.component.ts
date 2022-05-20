import { registerLocaleData } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt');

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.scss'],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
})
export class InicioComponent implements OnInit {
   

    constructor(
       
    ) {}

    ngOnInit() {
       
    }
    
}
