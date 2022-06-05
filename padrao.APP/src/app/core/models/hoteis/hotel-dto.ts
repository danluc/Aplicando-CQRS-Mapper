import { Empresas } from '../empresas/empresa';
import { Enderecos } from '../endereco';

export class HotelDTO {
    id?: number;
    nome: string;
    telefone: string;
    contato: string;
    observacao: string;
    codigo: string;
    enderecoId?: string;
    empresaId?: string;
    endereco?: Enderecos;
    empresa?: Empresas;
}
