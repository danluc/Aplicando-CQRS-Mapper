import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseLoadingBarService } from '@fuse/components/loading-bar';
import { EmpresaControllerService } from 'app/core/services/controllers/empresa-controller.service';
import { ToastService } from 'app/core/services/toast.service';

@Component({
    selector: 'app-inserir-imagem',
    templateUrl: './inserir-imagem.component.html',
    styleUrls: ['./inserir-imagem.component.scss'],
})
export class InserirImagemComponent implements OnInit {
    public formFile: FormGroup;
    public base64: string | ArrayBuffer;
    @Input() public imagem: string;
    public arquivo: File | Blob;
    public mostrarImg: boolean = false;
    public salvando: boolean = false;
    public liberarArquivo: boolean = false;
    public nomeArquivo: string = '';

    constructor(
        private _formBuilder: FormBuilder,
        private _fuseLoadingService: FuseLoadingBarService,
        private _toastService: ToastService,
        private _empresaControllerService: EmpresaControllerService
    ) {}

    ngOnInit() {
        this.formFile = this._formBuilder.group({
            file: ['', [Validators.required]],
        });
        if (this.imagem != null) {
            this.mostrarImg = true;
            this.base64 = this.imagem;
        }
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
        reader.onload = () => {
            this.base64 = reader.result;
            this.mostrarImg = true;
            this.liberarArquivo = true;
        };
        this.salvar();
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

    private salvar(): void {
        this.salvando = true;
        this._empresaControllerService.inserirImagem(this.arquivo).subscribe(
            (res) => {
                if (!res.sucesso) {
                    this._toastService.mensagemError(
                        'Erro ao inserir imagem: ' + res.mensagem
                    );
                    return;
                }
                this._toastService.mensagemSuccess(
                    'Imagem cadastrada com sucesso!'
                );
                this.base64 = res.url;
                this._fuseLoadingService.hide();
                this.salvando = false;
            },
            (err) => {
                console.log(err.error);
                this.salvando = false;
                this._toastService.mensagemError(
                    'Erro ao atualizar: ' + err.error
                );
                this._fuseLoadingService.hide();
            }
        );
    }
}
