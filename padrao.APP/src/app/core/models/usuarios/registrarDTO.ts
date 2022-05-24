import { Empresas } from '../empresas/empresa';
import { Funcao } from '../funcao/funcao';

export class RegistrarDTO {
    nome: string;
    email: string;
    senha: string;
    empresaId?: Empresas;
    funcoes?: Funcao | string;
}
