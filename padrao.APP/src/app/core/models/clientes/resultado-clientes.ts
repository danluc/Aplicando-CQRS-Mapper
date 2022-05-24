import { ResultadoDefault } from '../resultado-default';
import { ClienteDTO } from './cliente-dto';

export class ResultadoClientes extends ResultadoDefault {
    cliente: Array<ClienteDTO>;
}
