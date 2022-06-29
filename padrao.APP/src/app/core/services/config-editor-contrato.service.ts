import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { textoContratoPadraoSistema } from '../functions/configuracao-editor-texto';
import {
    EnderecoCidadeUF,
    EnderecoContratoPadra,
} from '../functions/endereco-extenso';
import { Empresas } from '../models/empresas/empresa';
import { TamanhoPapel } from '../models/enums/tamanho-papel';

@Injectable({
    providedIn: 'root',
})
export class ConfigEditorTextoContratoService {
    private _empresa: Empresas;
    public LOGOEMPRESA: string = '{LOGOEMPRESA}';
    public NOMEEMPRESA: string = '{NOMEEMPRESA}';
    public ENDERECOEMPRESA: string = '{ENDERECOEMPRESA}';
    public CADASTUR: string = '{CADASTUR}';
    public CIDADEUFEMPRESA: string = '{CIDADEUFEMPRESA}';
    public TELEFONEEMPRESA: string = '{TELEFONEEMPRESA}';
    public CNPJ: string = '{CNPJ}';

    public NOMECLIENTE: string = '{NOMECLIENTE}';
    public CPFCLIENTE: string = '{CPFCLIENTE}';
    public RGCLIENTE: string = '{RGCLIENTE}';

    public NOMEEXCURSAO: string = '{NOMEEXCURSAO}';
    public LOCALEXCURSAO: string = '{LOCALEXCURSAO}';
    public LOCALSAIDAEXCURSAO: string = '{LOCALSAIDAEXCURSAO}';
    public DATASAIDAEXCURSAO: string = '{DATASAIDAEXCURSAO}';
    public CIDADEEXCURSAO: string = '{CIDADEEXCURSAO}';
    public UFEXCURSAO: string = '{UFEXCURSAO}';
    public CIDADESAIDAEXCURSAO: string = '{CIDADESAIDAEXCURSAO}';
    public UFSAIDAEXCURSAO: string = '{UFSAIDAEXCURSAO}';

    public DATAVIAGEM: string = '{DATAVIAGEM}';

    constructor() {}

    public guardaDadosEmpresa(empresa: Empresas): void {
        this._empresa = empresa;
    }

    public retornarDadosEmpresa(): Empresas {
        return this._empresa;
    }

    public configuracaoPadraoEditor(): object {
        return {
            base_url: environment.baseUrl + 'tinymce' || '/tinymce',
            language: 'pt_BR',
            suffix: '.min',
            menubar: false,
            height: 500,
            nonbreaking_force_tab: true,
            relative_urls: false,
            remove_script_host: false,
            startupFocus: true,
            contextmenu: false,
            content_css: [
                '//fonts.googleapis.com/css?family=Open+Sans&display=swap',
                this.retornarCssPorTamanhoPapel(TamanhoPapel.A4),
                environment.baseUrl + 'assets/css/tinymce-custon.css',
            ],
            body_class: 'page',
            pagebreak_separator: "<p style='page-break-after: always;'></p>",
            resize: false,
            force_br_newlines: true,
            force_p_newlines: false,
            forced_root_block: '',
            autoresize_on_init: true,
            max_height: +500,
            min_height: +500,
            margemSuperior: null,
            noneditable_editable_class: 'editable', // class allowed to edit
            noneditable_noneditable_class: 'mceNonEditable', // the parent (everything else)
            table_default_styles: {
                width: '100%',
            },
            plugins: [
                'noneditable advlist autolink lists link image charmap print anchor',
                'searchreplace visualblocks code fullscreen hr',
                'insertdatetime media table paste code help wordcount pagebreak preview toc',
            ],
            toolbar_mode: 'wrap',
            toolbar:
                ' inserir | fullpage | table | alignleft aligncenter alignright alignjustify | ' +
                '| bold italic underline strikethrough | fontselect fontsizeselect lineheight | forecolor backcolor removeformat | bullist numlist outdent indent | undo redo | hr pagebreak | code ',
            fontsize_formats:
                '8pt 10pt 11pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
            lineheight_formats: '1 1.1 1.2 1.3 1.4 1.5 2',
            paste_enable_default_filters: false,
            paste_word_valid_elements: 'b,strong,i,em,h1,h2',
            invalid_styles: {
                table: 'height',
                tr: 'height',
                th: 'heigh',
            },
            content_style:
                'body { font-family: Calibri; font-size: 12pt;};table{height: max-content!important}',
            font_formats:
                'Andale Mono=andale mono,times; Calibri=Calibri; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats',
            setup: (editor) => {
                this.adicionarMenuInserir(editor);
                editor.on('init', () => {});
            },
        };
    }

    private adicionarMenuInserir(editor: any): void {
        editor.ui.registry.addMenuButton('inserir', {
            text: 'Inserir',
            icon: 'plus',
            tooltip: 'Inserir',
            fetch: (callback) => {
                const items = [
                    {
                        type: 'togglemenuitem',
                        text: 'Texto padrão',
                        onAction: () => {
                            this.setTextoPadrao(editor);
                        },
                        onSetup: (api) => {
                            return () => {};
                        },
                    },
                    {
                        type: 'nestedmenuitem',
                        text: 'Dados cliente',
                        getSubmenuItems: () => {
                            return [
                                this.inserirVariavel(
                                    editor,
                                    'Nome',
                                    this.NOMECLIENTE
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'CPF',
                                    this.CPFCLIENTE
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Rg',
                                    this.RGCLIENTE
                                ),
                            ];
                        },
                    },
                    {
                        type: 'nestedmenuitem',
                        text: 'Dados excursão',
                        getSubmenuItems: () => {
                            return [
                                this.inserirVariavel(
                                    editor,
                                    'Nome',
                                    this.NOMEEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Local',
                                    this.LOCALEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Local saída',
                                    this.LOCALSAIDAEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Data saída',
                                    this.DATASAIDAEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Cidade excursão',
                                    this.CIDADEEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'UF excursão',
                                    this.UFEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Cidade saída',
                                    this.CIDADESAIDAEXCURSAO
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'UF saída',
                                    this.UFSAIDAEXCURSAO
                                ),
                            ];
                        },
                    },
                    {
                        type: 'nestedmenuitem',
                        text: 'Dados empresa',
                        getSubmenuItems: () => {
                            return [
                                this.inserirVariavel(
                                    editor,
                                    'Nome',
                                    this.NOMEEMPRESA
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'CPF/CPNJ',
                                    this.CNPJ
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Telefone',
                                    this.TELEFONEEMPRESA
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Endereco',
                                    this.ENDERECOEMPRESA
                                ),
                                this.inserirVariavel(
                                    editor,
                                    'Cidade/UF',
                                    this.CIDADEUFEMPRESA
                                ),
                            ];
                        },
                    },
                ];
                callback(items);
            },
        });
    }

    private retornarCssPorTamanhoPapel(tamanhoPapel: TamanhoPapel): string {
        let urlCss = environment.baseUrl + 'assets/css/';
        switch (tamanhoPapel) {
            case TamanhoPapel.A3:
                urlCss += 'sheets-of-paper-a3.css';
                break;
            case TamanhoPapel.A5:
                urlCss += 'sheets-of-paper-a5.css';
                break;
            case TamanhoPapel.Carta:
                urlCss += 'sheets-of-paper-usletter.css';
                break;
            case TamanhoPapel.Oficio:
                urlCss += 'sheets-of-paper-uslegal.css';
                break;
            case TamanhoPapel.Tabloide:
                urlCss += 'sheets-of-paper-ustabloid.css';
                break;
            default:
                urlCss += 'sheets-of-paper-a4.css';
                break;
        }

        return urlCss;
    }

    private espacoSuperior(editor: any, espaco: number, text: string): object {
        return {
            type: 'menuitem',
            text: text,
            onAction: () => {
                editor.insertContent(
                    `<div style="padding-top: ${espaco}px"></div>`
                );
            },
        };
    }

    private inserirVariavel(
        editor: any,
        titulo: string,
        variavel: string
    ): object {
        return {
            type: 'menuitem',
            text: titulo,
            onAction: () => {
                editor.insertContent(`${variavel}`);
            },
        };
    }

    private setTextoPadrao(editor: any): string {
        const iframe: HTMLIFrameElement =
            document.querySelector('editor iframe');

        if (iframe.contentDocument.getElementById('container-cabecalho')) {
            return;
        }

        const body = iframe.contentDocument
            .getElementsByTagName('body')
            .item(0);
        let txt = this.tratarParametrosEditor();
        editor.setContent(txt);
    }

    private tratarParametrosEditor(): string {
        let textoPadrao = textoContratoPadraoSistema();
        textoPadrao = textoPadrao.replace(
            new RegExp(this.LOGOEMPRESA, 'g'),
            this._empresa.imagem
        );
        textoPadrao = textoPadrao.replace(
            new RegExp(this.NOMEEMPRESA, 'g'),
            this._empresa.nome
        );
        textoPadrao = textoPadrao.replace(
            new RegExp(this.ENDERECOEMPRESA, 'g'),
            EnderecoContratoPadra(this._empresa.endereco)
        );
        textoPadrao = textoPadrao.replace(new RegExp(this.CADASTUR, 'g'), '');
        textoPadrao = textoPadrao.replace(
            new RegExp(this.CNPJ, 'g'),
            this._empresa.cpfcnpj
        );
        textoPadrao = textoPadrao.replace(
            new RegExp(this.CIDADEUFEMPRESA, 'g'),
            EnderecoCidadeUF(this._empresa.endereco)
        );
        return textoPadrao;
    }
}
