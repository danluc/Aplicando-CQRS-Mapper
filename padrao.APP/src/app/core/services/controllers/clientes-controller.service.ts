import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { ResultadoCliente } from 'app/core/models/clientes/resultado-cliente';
import { ResultadoClientes } from 'app/core/models/clientes/resultado-clientes';
import { ResultadoSelecionarEmpresa } from 'app/core/models/empresas/resultado-selecionar-empresa';
import { ResultadoDefault } from 'app/core/models/resultado-default';
import { RegistrarDTO } from 'app/core/models/usuarios/registrarDTO';
import { ResultadoListaUsuario } from 'app/core/models/usuarios/resultado-lista-usuario';
import { ResultadoLogin } from 'app/core/models/usuarios/resultado-login';
import { Usuarios } from 'app/core/models/usuarios/usuarios';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class ClientesControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: ClienteDTO): Observable<ResultadoCliente> {
        return this.post(`clientes`, dados);
    }

    public atualizar(dados: ClienteDTO): Observable<ResultadoCliente> {
        return this.put(`clientes`, dados);
    }

    public selecionar(codigo: string): Observable<ResultadoCliente> {
        return this.get(`clientes/${codigo}`);
    }

    public listar(skip: number, take: number): Observable<ResultadoClientes> {
        return this.get<ResultadoClientes>(`clientes/${skip}/${take}`);
    }

    public alterarStatus(codigo: string): Observable<ResultadoCliente> {
        return this.put(`clientes/alterarsituacao/${codigo}`, null);
    }
}
