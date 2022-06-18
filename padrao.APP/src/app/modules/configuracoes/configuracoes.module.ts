import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfiguracoesComponent } from './configuracoes.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AlterarSenhaComponent } from './usuarios/alterar-senha/alterar-senha.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { PlanosComponent } from './planos/planos.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentesModule } from '../components/componentes.module';
import { InserirImagemComponent } from './empresa/inserir-imagem/inserir-imagem.component';
import { CadastrarUsuarioComponent } from './usuarios/cadastrar-usuario/cadastrar-usuario.component';
import { ContratoViagemComponent } from './contrato-viagem/contrato-viagem.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ConfiguracoesComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(exampleRoutes),
        NgxMaskModule.forRoot(),
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        SharedModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatIconModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatCheckboxModule,
        ComponentesModule,
    ],
    declarations: [
        ConfiguracoesComponent,
        MinhaContaComponent,
        UsuariosComponent,
        AlterarSenhaComponent,
        EmpresaComponent,
        PlanosComponent,
        InserirImagemComponent,
        CadastrarUsuarioComponent,
        ContratoViagemComponent,
    ],
})
export class ConfiguracoesModule {}
