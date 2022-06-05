import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResultadoCliente } from 'app/core/models/clientes/resultado-cliente';
import { ResultadoClientes } from 'app/core/models/clientes/resultado-clientes';
import { MotoristaDTO } from 'app/core/models/motoristas/motorista-dto';
import { ResultadoMotorista } from 'app/core/models/motoristas/resultado-motorista';
import { ResultadoMotoristas } from 'app/core/models/motoristas/resultado-motoristas';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class MotoristasControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: MotoristaDTO): Observable<ResultadoMotorista> {
        return this.post(`motoristas`, dados);
    }

    public atualizar(dados: MotoristaDTO): Observable<ResultadoMotorista> {
        return this.put(`motoristas`, dados);
    }

    public selecionar(codigo: string): Observable<ResultadoMotorista> {
        return this.get(`motoristas/${codigo}`);
    }

    public listar(
        skip: number,
        take: number,
        nomeCpf?: string
    ): Observable<ResultadoMotoristas> {
        return this.get<ResultadoMotoristas>(
            `motoristas/${skip}/${take}/${nomeCpf}`
        );
    }
}
