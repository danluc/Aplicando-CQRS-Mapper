import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ViacepService {
    constructor(private http: HttpClient) {}

    public buscarPorViaCep(cep: string): Observable<any> {
        return this.http.get<any>(
            `https://viacep.com.br/ws/${cep}/json`
        );
    }
}
