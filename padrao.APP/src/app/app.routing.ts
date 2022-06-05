import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { PerfilGuard } from './core/auth/guards/perfil.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: 'login' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'inicio' },
    { path: 'sign-in', pathMatch: 'full', redirectTo: 'login' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'login',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'registrar',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard, PerfilGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'inicio',
                loadChildren: () =>
                    import('app/modules/inicio/inicio.module').then(
                        (m) => m.InicioModule
                    ),
            },
            {
                path: 'configuracoes',
                loadChildren: () =>
                    import(
                        'app/modules/configuracoes/configuracoes.module'
                    ).then((m) => m.ConfiguracoesModule),
            },
            {
                path: 'clientes',
                loadChildren: () =>
                    import('app/modules/clientes/clientes.module').then(
                        (m) => m.ClientesModule
                    ),
            },
            {
                path: 'motoristas',
                loadChildren: () =>
                    import('app/modules/motoristas/motoristas.module').then(
                        (m) => m.MotoristasModule
                    ),
            },
            {
                path: 'hotel',
                loadChildren: () =>
                    import('app/modules/hoteis/hoteis.module').then(
                        (m) => m.HoteisModule
                    ),
            },
        ],
    },
];
