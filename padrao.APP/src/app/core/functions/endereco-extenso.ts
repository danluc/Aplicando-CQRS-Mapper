import { Enderecos } from '../models/endereco';

export function EnderecoPorExtenso(endereco: Enderecos): string {
    return `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cep}, ${endereco.cidade}/ ${endereco.uf}, `;
}

export function EnderecoContratoPadra(endereco: Enderecos): string {
    return `Cidade de ${endereco.cidade} - ${endereco.uf}, com sede na ${endereco.logradouro} N ${endereco.numero} Bairro ${endereco.bairro}`;
}

export function EnderecoCidadeUF(endereco: Enderecos): string {
    return `${endereco.cidade}/${endereco.uf}`;
}
