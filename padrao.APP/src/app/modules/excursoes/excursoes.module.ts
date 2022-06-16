import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from 'app/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PipesModule } from 'app/core/pipe/pipes.module';
import { FuseFindByKeyPipeModule } from '@fuse/pipes/find-by-key';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ComponentesModule } from '../components/componentes.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FuseAlertModule } from '@fuse/components/alert';
import { FuseCardModule } from '@fuse/components/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { NgxMaskModule } from 'ngx-mask';
import { ExcursoesComponent } from './excursoes.component';

const exampleRoutes: Route[] = [
    {
        path: '',
        component: ExcursoesComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(exampleRoutes),
        NgxMaskModule.forRoot(),
        NgApexchartsModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatSortModule,
        MatTableModule,
        SharedModule,
        MatInputModule,
        MatCheckboxModule,
        MatTooltipModule,
        PipesModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        FuseCardModule,
        FuseAlertModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatSlideToggleModule,
        ComponentesModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatRippleModule,
    ],
    declarations: [ExcursoesComponent],
})
export class ExcursoesModule {}
