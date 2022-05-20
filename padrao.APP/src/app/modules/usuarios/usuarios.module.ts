import { UsuariosComponent } from './usuarios.component';
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
import { AlterarSenhaComponent } from './alterar-senha/alterar-senha.component';

const exampleRoutes: Route[] = [
  {
      path: '',
      component: UsuariosComponent,
  },
];

@NgModule({
  imports: [
      CommonModule,
      RouterModule.forChild(exampleRoutes),
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
  ],
  declarations: [
      UsuariosComponent,
      AlterarSenhaComponent,
  ],
})
export class UsuariosModule {}
