import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClienteDTO } from 'app/core/models/clientes/cliente-dto';
import { ResultadoCliente } from 'app/core/models/clientes/resultado-cliente';
import { ResultadoClientes } from 'app/core/models/clientes/resultado-clientes';
import { ContratoDTO } from 'app/core/models/contrato/contrato-dto';
import { ResultadoSelecionarContrato } from 'app/core/models/contrato/resultado-selecionar-contrato';
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
export class ContratoControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: string): Observable<ResultadoSelecionarContrato> {
        return this.post(`contrato`, { dados: dados });
    }

    public atualizar(
        dados: ContratoDTO
    ): Observable<ResultadoSelecionarContrato> {
        return this.put(`contrato`, dados);
    }

    public selecionar(): Observable<ResultadoSelecionarContrato> {
        return this.get(`contrato`);
    }
}
