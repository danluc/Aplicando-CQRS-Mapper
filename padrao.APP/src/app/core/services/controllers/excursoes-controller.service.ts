import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ExcursaoDTO } from 'app/core/models/excursoes/excursao-dto';
import { ResultadoExcursao } from 'app/core/models/excursoes/resultado-excursao';
import { ResultadoExcursoes } from 'app/core/models/excursoes/resultado-excursoes';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class ExcursoesControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: ExcursaoDTO): Observable<ResultadoExcursao> {
        return this.post(`excursoes`, dados);
    }

    public atualizar(dados: ExcursaoDTO): Observable<ResultadoExcursao> {
        return this.put(`excursoes`, dados);
    }

    public selecionar(codigo: string): Observable<ResultadoExcursao> {
        return this.get(`excursoes/${codigo}`);
    }

    public listar(
        skip: number,
        take: number,
        nomeCpf?: string
    ): Observable<ResultadoExcursoes> {
        return this.get<ResultadoExcursoes>(
            `excursoes/${skip}/${take}/${nomeCpf}`
        );
    }
}
