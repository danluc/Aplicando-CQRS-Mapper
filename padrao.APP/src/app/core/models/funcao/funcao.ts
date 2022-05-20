import { Empresas } from '../empresas/empresa';
import { Usuarios } from '../usuarios/usuarios';

export class Funcao {
    funcoes: string;
    id?: number;
    empresaId?: number;
    empresa: Empresas;
    usuario: Usuarios;
}
