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
    {
        id: 'clientes',
        title: 'Clientes',
        type: 'basic',
        icon: 'heroicons_outline:users',
        link: '/clientes',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
    {
        id: 'Hotel',
        title: 'Hotel',
        type: 'basic',
        icon: 'heroicons_outline:office-building',
        link: '/Hotel',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
    {
        id: 'Motoristas',
        title: 'Motoristas',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: '/Motoristas',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
    {
        id: 'onibus',
        title: 'Ônibus/Carros',
        type: 'basic',
        icon: 'heroicons_outline:flag',
        link: '/onibus',
        perfisAcesso: [RoleUsuario.ADMIN, RoleUsuario.USUARIO],
    },
];
