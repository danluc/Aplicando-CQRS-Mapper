import { Empresas } from '../empresas/empresa';
import { Funcao } from '../funcao/funcao';

export class Usuarios {
    nome: string;
    email: string;
    senha?: string;
    codigo: string;
    situacao: boolean;
    id?: number;
    empresaId: number;
    empresa: Empresas;
    funcao: Funcao;
}
