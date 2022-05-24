import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
export class UsuariosControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public registrar(dados: RegistrarDTO): Observable<ResultadoLogin> {
        return this.post(`Auth/Registrar`, {
            email: dados.email,
            senha: dados.senha,
            nome: dados.nome,
        });
    }

    public listarUsuarios(): Observable<ResultadoListaUsuario> {
        return this.get<ResultadoListaUsuario>(`usuarios`);
    }

    public alterarSenha(novaSenha: string): Observable<ResultadoDefault> {
        return this.put(`usuarios/alterarsenha`, { novaSenha });
    }

    public adicionarUsuario(dados: RegistrarDTO): Observable<ResultadoLogin> {
        return this.post(`usuarios/AdicionarUsuario`, {
            email: dados.email,
            senha: dados.senha,
            nome: dados.nome,
            funcoes: dados.funcoes,
        });
    }

    public alterarFuncao(
        funcao: string,
        codigo: string
    ): Observable<ResultadoDefault> {
        return this.put(`usuarios/AlterarFuncao/${codigo}`, {
            funcao: funcao,
        });
    }

    public alterarStatus(codigo: string): Observable<ResultadoDefault> {
        return this.put(`usuarios/AlterarStatus/${codigo}`, null);
    }
}
