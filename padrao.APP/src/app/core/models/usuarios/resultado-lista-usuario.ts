import { ResultadoDefault } from '../resultado-default';
import { Usuarios } from './usuarios';

export class ResultadoListaUsuario extends ResultadoDefault {
    usuarios: Array<Usuarios>;
}
