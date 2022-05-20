import { FuseNavigationItem } from '@fuse/components/navigation';
import { RoleUsuario } from '../models/usuarios/enums/role-usuario';

export const menuprincipal: FuseNavigationItem[] = [
    {
        id: 'inicio',
        title: 'Inicio',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/inicio',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
    {
        id: 'configuracoes',
        title: 'Configurações',
        type: 'basic',
        icon: 'heroicons_outline:cog',
        link: '/configuracoes',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
];
