import { Empresas } from "../empresas/empresa";
import { Enderecos } from "../endereco";

export class ClienteDTO {
    id?: number;
    nome: string;
    email: string;
    cpf: string;
    rg: string;
    orgEmissor: string;
    telefone: string;
    celular: string;
    dataNascimento?: Date;
    imagem: string;
    observacao: string;
    codigo: string;
    enderecoId?: string;
    empresaId?: string;
    endereco?: Enderecos;
    empresa?: Empresas;
}