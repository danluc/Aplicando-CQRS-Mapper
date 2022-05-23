import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-cadastrar-imagem',
    templateUrl: './cadastrar-imagem.component.html',
    styleUrls: ['./cadastrar-imagem.component.scss'],
})
export class CadastrarImagemComponent implements OnInit {
    public formFile: FormGroup;
    public base64: string | ArrayBuffer;
    public arquivo: File | Blob;
    public mostrarImg: boolean = false;
    public salvando: boolean = false;
    public liberarArquivo: boolean = false;
    public nomeArquivo: string = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseLoadingService: FuseLoadingBarService,
        private _toastService: ToastService
    ) {}

    ngOnInit() {
        this.formFile = this._formBuilder.group({
            file: ['', [Validators.required]],
        });
    }

    public abrirSelecionarArquivo(): void {
        document.getElementById('selecionar-arquivo').click();
    }

    public anexarFile(event: Event): void {
        const files = (event.target as HTMLInputElement).files;
        setTimeout(() => {
            if (files) {
                for (const file of Array.from(files)) {
                    if (this.validaArquivoAnexarArquivo(file)) {
                        this.salvando = true;
                        this.arquivo = file;
                        this.tratarBase64(file);
                        this.nomeArquivo = file.name;
                    }
                }
            }
            this.formFile.reset();
        });
    }

    private tratarBase64(blob: Blob): void {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            this.base64 = reader.result;
            this.mostrarImg = true;
            this.liberarArquivo = true;
            this.salvando = false;
        };
    }

    private validaArquivoAnexarArquivo(file: File): boolean {
        if (
            file.type === 'image/jpeg' ||
            file.type === 'image/png' ||
            file.type === 'image/bmp'
        ) {
            return true;
        }
        this.liberarArquivo = false;
        this.nomeArquivo = '';
        this._toastService.mensagemError('Arquivo inválido!');
        return false;
    }
}
