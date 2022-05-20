import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { FuseFullscreenModule } from '@fuse/components/fullscreen';
import { FuseNavigationModule } from '@fuse/components/navigation';
import { QuickChatModule } from 'app/layout/common/quick-chat/quick-chat.module';
import { ShortcutsModule } from 'app/layout/common/shortcuts/shortcuts.module';
import { UserModule } from 'app/layout/common/user/user.module';
import { SharedModule } from 'app/shared/shared.module';
import { ModernLayoutComponent } from 'app/layout/layouts/horizontal/modern/modern.component';
import { FuseLoadingBarModule } from '@fuse/components/loading-bar';

@NgModule({
    declarations: [ModernLayoutComponent],
    imports: [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        FuseFullscreenModule,
        FuseNavigationModule,
        QuickChatModule,
        ShortcutsModule,
        UserModule,
        SharedModule,
        FuseLoadingBarModule,
    ],
    exports: [ModernLayoutComponent],
})
export class ModernLayoutModule {}
