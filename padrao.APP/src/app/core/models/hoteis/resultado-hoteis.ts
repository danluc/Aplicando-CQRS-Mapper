import { ResultadoPaginacaoDTO } from '../resultado-paginacao-dto';
import { HotelDTO } from './hotel-dto';

export class ResultadoHoteis extends ResultadoPaginacaoDTO {
    hotel: Array<HotelDTO>;
}
