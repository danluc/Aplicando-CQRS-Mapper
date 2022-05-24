import { ResultadoDefault } from '../resultado-default';
import { ClienteDTO } from './cliente-dto';

export class ResultadoCliente extends ResultadoDefault {
    cliente: ClienteDTO;
}
