import { ResultadoPaginacaoDTO } from '../resultado-paginacao-dto';
import { MotoristaDTO } from './motorista-dto';

export class ResultadoMotoristas extends ResultadoPaginacaoDTO {
    motoristas: Array<MotoristaDTO>;
}
