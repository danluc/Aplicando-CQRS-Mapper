import { Empresas } from '../empresas/empresa';

export class ContratoDTO {
    contrato: string;
    codigo?: string;
    id?: number;
    enderecoId?: number;
    empresa?: Empresas;
}
