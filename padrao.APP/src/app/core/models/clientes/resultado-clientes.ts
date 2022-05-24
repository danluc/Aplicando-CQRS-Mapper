import { ResultadoDefault } from '../resultado-default';
import { ResultadoPaginacaoDTO } from '../resultado-paginacao-dto';
import { ClienteDTO } from './cliente-dto';

export class ResultadoClientes extends ResultadoPaginacaoDTO {
    clientes: Array<ClienteDTO>;
}
