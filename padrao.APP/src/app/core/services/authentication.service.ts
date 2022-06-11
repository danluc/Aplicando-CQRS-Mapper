import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuarios } from '../models/usuarios/usuarios';
import { environment } from 'environments/environment';
import { LoginDTO } from '../models/usuarios/LoginDTO';
import { map } from 'rxjs/operators';
import { UsuarioDTO } from '../models/usuarios/usuarioDTO';
import { ResultadoLogin } from '../models/usuarios/resultado-login';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private _currentUserSubject: BehaviorSubject<UsuarioDTO>;
    public CurrentUser: Observable<UsuarioDTO>;
    private http: HttpClient;

    constructor(handler: HttpBackend) {
        this.http = new HttpClient(handler);
        this._currentUserSubject = new BehaviorSubject<UsuarioDTO>(
            JSON.parse(sessionStorage.getItem('currentUser'))
        );
        this.CurrentUser = this._currentUserSubject.asObservable();
    }

    public get currentUserValue(): UsuarioDTO {
        return this._currentUserSubject.value;
    }

    public set currentUserValue(user: UsuarioDTO) {
        this.setUser(user);
    }

    private setUser(user: UsuarioDTO): void {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        sessionStorage.setItem('accessToken', user.token);
        this._currentUserSubject.next(user);
    }

    public login(login: LoginDTO): Observable<any> {
        return this.http
            .post<ResultadoLogin>(`${environment.apiUrl}auth/login`, login)
            .pipe(
                map((res) => {
                    this.setUser(res.usuario);
                    return res.usuario;
                })
            );
    }

    public logout(): void {
        sessionStorage.removeItem('currentUser');
        sessionStorage.clear();
        sessionStorage.clear();
        this._currentUserSubject.next(null);
    }
}
