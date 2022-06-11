import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OnibusDTO } from 'app/core/models/onibus/onibus-dto';
import { ResultadoCarros } from 'app/core/models/onibus/resultado-carros';
import { ResultadoOnibus } from 'app/core/models/onibus/resultado-onibus';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class OnibusControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: OnibusDTO): Observable<ResultadoOnibus> {
        return this.post(`onibus`, dados);
    }

    public atualizar(dados: OnibusDTO): Observable<ResultadoOnibus> {
        return this.put(`onibus`, dados);
    }

    public selecionar(codigo: string): Observable<ResultadoOnibus> {
        return this.get(`onibus/${codigo}`);
    }

    public listar(
        skip: number,
        take: number,
        nomeCpf?: string
    ): Observable<ResultadoCarros> {
        return this.get<ResultadoCarros>(`onibus/${skip}/${take}/${nomeCpf}`);
    }
}
