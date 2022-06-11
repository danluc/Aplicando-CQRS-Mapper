import { ResultadoPaginacaoDTO } from '../resultado-paginacao-dto';
import { OnibusDTO } from './onibus-dto';

export class ResultadoCarros extends ResultadoPaginacaoDTO {
    onibus: Array<OnibusDTO>;
}
