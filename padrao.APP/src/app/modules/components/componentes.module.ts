import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastrarEnderecoComponent } from './cadastrar-endereco/cadastrar-endereco.component';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule } from '@fuse/components/alert';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { PipesModule } from 'app/core/pipe/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
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
        NgxMaskModule.forRoot(),
        MatCheckboxModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatMomentDateModule,
        PipesModule,
    ],
    exports: [CadastrarEnderecoComponent],
    declarations: [CadastrarEnderecoComponent],
})
export class ComponentesModule {}
