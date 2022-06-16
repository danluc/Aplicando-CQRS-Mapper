import { ResultadoPaginacaoDTO } from '../resultado-paginacao-dto';
import { ExcursaoDTO } from './excursao-dto';

export class ResultadoExcursoes extends ResultadoPaginacaoDTO {
    excursoes: Array<ExcursaoDTO>;
}
