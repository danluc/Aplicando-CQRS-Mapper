export class PaginacaoDTO {
    skip: number;
    take: number;
    carregarMais: boolean = false;
    nomeCpf: string = '';

    constructor(sk: number, tk: number, carregar: boolean = false, nome = '') {
        this.skip = sk;
        this.take = tk;
        this.carregarMais = carregar;
        this.nomeCpf = nome;
    }
}
