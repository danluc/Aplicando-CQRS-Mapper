import { Empresas } from '../empresas/empresa';
import { Funcao } from '../funcao/funcao';

export class UsuarioDTO {
    id?: number;
    codigo: string;
    nome: string;
    email: string;
    token: string;
    situacao: boolean;
    empresaId: number;
    empresa: Empresas;
    funcao: Funcao;
}
