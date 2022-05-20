import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InicioComponent } from './inicio.component';
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

const exampleRoutes: Route[] = [
    {
        path: '',
        component: InicioComponent,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(exampleRoutes),
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
        PipesModule
        ],
    declarations: [InicioComponent],
})
export class InicioModule {}
