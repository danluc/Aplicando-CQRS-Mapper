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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ComponentesModule } from '../components/componentes.module';
import { ClientesComponent } from './clientes.component';
import { CadastrarClientesComponent } from './cadastrar-clientes/cadastrar-clientes.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PipesModule } from 'app/core/pipe/pipes.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ClientesComponent,
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
        MatDatepickerModule,
        MatMomentDateModule,
        PipesModule,
        MatNativeDateModule,
        MatAutocompleteModule,
    ],
    declarations: [ClientesComponent, CadastrarClientesComponent],
    providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class ClientesModule {}
