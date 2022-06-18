import { Empresas } from '../empresas/empresa';
import { Enderecos } from '../endereco';
import { OnibusMotoristaExcursao } from './onibus-motorista-excursao';

export class ExcursaoDTO {
    id?: number;
    codigo: string;
    nome: string;
    dataIncio: Date;
    dataFim: Date;
    dataSaida: Date;
    dataRetorno: Date;
    valorAdulto: number;
    valorInfantil: number;
    considerarCrianca: number;
    itinerario?: string;
    observacoes?: string;
    contrato?: string;
    situacao?: boolean;
    enderecoDestinoId?: number;
    enderecoSaidaId?: number;
    empresaId?: number;
    usuarioId?: number;
    empresa?: Empresas;
    enderecoDestino?: Enderecos;
    enderecoSaida?: Enderecos;
    onibusMotoristas?: Array<OnibusMotoristaExcursao>;
}
