import { Enderecos } from '../endereco';
import { Usuarios } from '../usuarios/usuarios';

export class Empresas {
    nome: string;
    email: string;
    telefone?: string;
    cpfcnpj?: string;
    imagem?: string;
    codigo: string;
    id?: number;
    enderecoId?: number;
    endereco: Enderecos;
    usuarios: Array<Usuarios>;
}
