import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Empresas } from 'app/core/models/empresas/empresa';
import { ResultadoSelecionarEmpresa } from 'app/core/models/empresas/resultado-selecionar-empresa';
import { ResultadoString } from 'app/core/models/resultado-string';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class EmpresaControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public selecionar(): Observable<ResultadoSelecionarEmpresa> {
        return this.get<ResultadoSelecionarEmpresa>(`empresas/selecionar`);
    }

    public atualizar(dados: Empresas): Observable<ResultadoSelecionarEmpresa> {
        return this.put(`empresas/Atualizar`, dados);
    }

    public inserirImagem(arquivo: File | Blob | string): Observable<ResultadoString> {
        const formData = new FormData();
        formData.append('arquivo', arquivo);
        return this.post(`empresas/InserirImagem`, formData);
    }
}
