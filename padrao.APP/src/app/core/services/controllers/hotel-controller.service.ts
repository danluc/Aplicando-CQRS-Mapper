import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HotelDTO } from 'app/core/models/hoteis/hotel-dto';
import { ResultadoHoteis } from 'app/core/models/hoteis/resultado-hoteis';
import { ResultadoHotel } from 'app/core/models/hoteis/resultado-hotel';
import { MotoristaDTO } from 'app/core/models/motoristas/motorista-dto';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';
import { BaseControllerService } from './base-contrller.service';

@Injectable({
    providedIn: 'root',
})
export class HotelControllerService extends BaseControllerService {
    constructor(
        _http: HttpClient,
        _authenticationService: AuthenticationService
    ) {
        super(_http, _authenticationService);
    }

    public cadastrar(dados: HotelDTO): Observable<ResultadoHotel> {
        return this.post(`hotel`, dados);
    }

    public atualizar(dados: HotelDTO): Observable<ResultadoHotel> {
        return this.put(`hotel`, dados);
    }

    public selecionar(codigo: string): Observable<ResultadoHotel> {
        return this.get(`hotel/${codigo}`);
    }

    public listar(
        skip: number,
        take: number,
        nomeCpf?: string
    ): Observable<ResultadoHoteis> {
        return this.get<ResultadoHoteis>(`hotel/${skip}/${take}/${nomeCpf}`);
    }
}
