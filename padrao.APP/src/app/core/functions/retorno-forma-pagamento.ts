import { FormasPagamento } from '../models/usuarios/enums/formas-pagamento';

export function RetornaFormaPagamento(tipo: FormasPagamento): string {
    if (tipo == FormasPagamento.CARTAO_CREDITO) {
        return 'Cartão de Crédito';
    }
    if (tipo == FormasPagamento.PIX) {
        return 'PIX';
    }
    if (tipo == FormasPagamento.DINHEIRO) {
        return 'Dinheiro';
    }
    return 'Não encontrado';
}
