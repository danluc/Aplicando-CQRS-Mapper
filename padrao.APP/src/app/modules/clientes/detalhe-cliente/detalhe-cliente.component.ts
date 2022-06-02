import { OverlayRef } from '@angular/cdk/overlay';
import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewContainerRef,
    ViewEncapsulation,
} from '@angular/core';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ListaContatosComponent } from '../lista-contatos/lista-contatos.component';

@Component({
    selector: 'app-detalhe-cliente',
    templateUrl: './detalhe-cliente.component.html',
    styleUrls: ['./detalhe-cliente.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class DetalheClienteComponent implements OnInit {
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _listaContatosComponent: ListaContatosComponent,
        private _viewContainerRef: ViewContainerRef
    ) {}

    ngOnInit() {
        this._listaContatosComponent.matDrawer.open();
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
        this.closeDrawer();
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    public closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._listaContatosComponent.matDrawer.close();
    }
}
