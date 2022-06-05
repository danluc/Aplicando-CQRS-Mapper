import { Empresas } from '../empresas/empresa';

export class MotoristaDTO {
    id?: number;
    nome: string;
    telefone: string;
    celular: string;
    observacao: string;
    codigo: string;
    empresaId?: string;
    empresa?: Empresas;
}
