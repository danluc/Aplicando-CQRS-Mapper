export class PaginacaoDTO {
    skip: number;
    take: number;
    carregarMais: boolean = false;

    constructor(sk: number, tk: number, carregar: boolean = false) {
        this.skip = sk;
        this.take = tk;
        this.carregarMais = carregar;
    }
}
