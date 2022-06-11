import { Empresas } from '../empresas/empresa';

export class OnibusDTO {
    id?: number;
    nome: string;
    placa: string;
    marca?: string;
    observacao: string;
    codigo: string;
    poltronas?: number;
    situacao?: boolean;
    empresaId?: string;
    empresa?: Empresas;
}
