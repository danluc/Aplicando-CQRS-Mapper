import { environment } from 'environments/environment';
import { TamanhoPapel } from '../models/enums/tamanho-papel';

export function configuracaoPadraoEditor(
    menuSuperior: boolean = false,
    heightEditor: string = '500',
    tamanhoPapel: TamanhoPapel = TamanhoPapel.A4
): object {
    return {
        base_url: environment.baseUrl + 'tinymce' || '/tinymce',
        language: 'pt_BR',
        suffix: '.min',
        menubar: menuSuperior,
        height: heightEditor,
        nonbreaking_force_tab: true,
        relative_urls: false,
        remove_script_host: false,
        startupFocus: true,
        contextmenu: false,
        content_css: [
            '//fonts.googleapis.com/css?family=Open+Sans&display=swap',
            retornarCssPorTamanhoPapel(tamanhoPapel),
            environment.baseUrl + 'assets/css/tinymce-custon.css',
        ],
        body_class: 'page',
        pagebreak_separator: "<p style='page-break-after: always;'></p>",
        resize: false,
        force_br_newlines: true,
        force_p_newlines: false,
        forced_root_block: '',
        autoresize_on_init: true,
        max_height: +heightEditor,
        min_height: +heightEditor,
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
        fontsize_formats: '8pt 10pt 11pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
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
            adicionarMenuInserir(editor);
            editor.on('init', () => {
                //focusTag(editor);
            });
        },
    };
}

function adicionarMenuInserir(editor: any): void {
    editor.ui.registry.addMenuButton('inserir', {
        text: 'Inserir',
        icon: 'plus',
        tooltip: 'Inserir',
        fetch: (callback) => {
            const items = [
                {
                    type: 'togglemenuitem',
                    text: 'Tabela de Aprovação',
                    onAction: () => {
                        tabelaPadraoRevisao(editor);
                        focusTag(editor);
                    },
                    onSetup: (api) => {
                        return () => {};
                    },
                },
                {
                    type: 'togglemenuitem',
                    text: 'Cabeçalho',
                    onAction: () => {
                        setCabecalho(editor);
                        focusTag(editor);
                    },
                    onSetup: (api) => {
                        return () => {};
                    },
                },
                {
                    type: 'togglemenuitem',
                    text: 'Nota rodapé',
                    onAction: () => {
                        editor.windowManager.open(dialogNotaRodaPe(editor));

                        focusTag(editor);
                    },
                    onSetup: (api) => {
                        return () => {};
                    },
                },
                {
                    type: 'nestedmenuitem',
                    text: 'Espaços Superior',
                    getSubmenuItems: () => {
                        return [
                            espacoSuperior(editor, 3, '3'),
                            espacoSuperior(editor, 6, '6'),
                            espacoSuperior(editor, 12, '12'),
                            espacoSuperior(editor, 18, '18'),
                            espacoSuperior(editor, 24, '24'),
                        ];
                    },
                },
            ];
            callback(items);
        },
    });
}

function dialogNotaRodaPe(editor: any): object {
    return {
        title: 'Mensagem nota de rodapé',
        body: {
            type: 'panel',
            items: [
                {
                    type: 'input',
                    name: 'fstoltip',
                    label: 'Texto nota rodapé',
                },
                {
                    type: 'input',
                    name: 'fstexto',
                    label: 'Texto no documento',
                },
            ],
        },
        buttons: [
            {
                type: 'cancel',
                name: 'closeButton',
                text: 'Fechar',
            },
            {
                type: 'submit',
                name: 'submitButton',
                text: 'Inserir',
                primary: true,
            },
        ],
        initialData: {
            catdata: 'Teste',
        },
        onSubmit: function (api) {
            var data = api.getData();
            editor.execCommand(
                'mceInsertContent',
                false,
                `<span class="fs-tooltip" data-title="${data.fstoltip}">${data.fstexto}</span>`
            );
            api.close();
        },
    };
}

function espacoSuperior(editor: any, espaco: number, text: string): object {
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

function tabelaPadraoRevisao(editor: any): void {
    const iframe: HTMLIFrameElement = document.querySelector('editor iframe');
    if (iframe.contentDocument.getElementById('rodape rodape-wrapper')) {
        return;
    }
    const item =
        '<div class="rodape rodape-wrapper" style="width: 100%;">\n' +
        '<div id="rodape" class="bloco">\n' +
        '<div class="row dados-rodape">\n' +
        '<table class="MsoTableGrid" style="border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt; width: 100%;" border="1" cellspacing="0" cellpadding="0">\n' +
        '<tbody>\n' +
        '<tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">\n' +
        '<td style="width: 69.2pt; border: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="92">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Revis&atilde;o</span></strong></p>\n' +
        '</td>\n' +
        '<td style="width: 63.8pt; border: solid windowtext 1.5pt; border-left: none; mso-border-left-alt: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="85">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Vig&ecirc;ncia</span></strong></p>\n' +
        '</td>\n' +
        '<td style="width: 299.2pt; border: solid windowtext 1.5pt; border-left: none; mso-border-left-alt: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="399">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Motivo da Revis&atilde;o</span></strong></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr style="mso-yfti-irow: 1;">\n' +
        '<td style="width: 69.2pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext 1.5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="92">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext 1.5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="85">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; text-align: center; line-height: normal;" align="center"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 299.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext 1.5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="399">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">Vers&atilde;o Inicial</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr style="mso-yfti-irow: 2;">\n' +
        '<td style="width: 69.2pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="92">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '<td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="85">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '<td style="width: 299.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="399">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr style="mso-yfti-irow: 3; mso-yfti-lastrow: yes;">\n' +
        '<td style="width: 69.2pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="92">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '<td style="width: 63.8pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="85">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '<td style="width: 299.2pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="399">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</tbody>\n' +
        '</table>\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '<table class="MsoTableGrid" style="border-collapse: collapse; border: none; mso-border-alt: solid windowtext .5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt; width: 100%;" border="1" cellspacing="0" cellpadding="0">\n' +
        '<tbody>\n' +
        '<tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes;">\n' +
        '<td style="width: 288.1pt; border: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt;" colspan="2" valign="top" width="384">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Elaborado por:</span></strong></p>\n' +
        '</td>\n' +
        '<td style="width: 144.1pt; border: solid windowtext 1.5pt; border-left: none; mso-border-left-alt: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Revisado por:</span></strong></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr style="mso-yfti-irow: 1;">\n' +
        '<td style="width: 144.05pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext 1.5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 144.05pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext 1.5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 144.1pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext 1.5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '<tr style="mso-yfti-irow: 2; mso-yfti-lastrow: yes;">\n' +
        '<td style="width: 144.05pt; border: solid windowtext 1.0pt; border-top: none; mso-border-top-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 144.05pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '<td style="width: 144.1pt; border-top: none; border-left: none; border-bottom: solid windowtext 1.0pt; border-right: solid windowtext 1.0pt; mso-border-top-alt: solid windowtext .5pt; mso-border-left-alt: solid windowtext .5pt; mso-border-alt: solid windowtext .5pt; padding: 0cm 5.4pt 0cm 5.4pt;" valign="top" width="192">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">-</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</tbody>\n' +
        '</table>\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">&nbsp;</span></p>\n' +
        '<table class="MsoTableGrid" style="border-collapse: collapse; border: none; mso-border-alt: solid windowtext 1.5pt; mso-yfti-tbllook: 1184; mso-padding-alt: 0cm 5.4pt 0cm 5.4pt; width: 100%; mso-border-insideh: 1.5pt solid windowtext; mso-border-insidev: 1.5pt solid windowtext;" border="1" cellspacing="0" cellpadding="0">\n' +
        '<tbody>\n' +
        '<tr style="mso-yfti-irow: 0; mso-yfti-firstrow: yes; mso-yfti-lastrow: yes;">\n' +
        '<td style="width: 140.1pt; border: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 2.5pt;" valign="top" width="187">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><strong style="mso-bidi-font-weight: normal;"><span style="font-size: 10.0pt;">Periodicidade de Revis&atilde;o</span></strong></p>\n' +
        '</td>\n' +
        '<td style="width: 292.1pt; border: solid windowtext 1.5pt; border-left: none; mso-border-left-alt: solid windowtext 1.5pt; padding: 0cm 5.4pt 0cm 5.4pt; height: 2.5pt;" valign="top" width="389">\n' +
        '<p class="MsoNormal" style="margin-bottom: .0001pt; line-height: normal;"><span style="font-size: 10.0pt;">A cada -- anos</span></p>\n' +
        '</td>\n' +
        '</tr>\n' +
        '</tbody>\n' +
        '</table>\n' +
        '</div>\n' +
        '<div id="assinatura" class="assinatura">\n' +
        '<p>Documento aprovado em <span id="sdata">[DATA]</span> por <span id="sassinante">[ASSINANTE]</span>.</p>\n' +
        '</div>\n' +
        '</div>\n' +
        '</div>';
    const conteudo: string = obterConteudo(editor).concat(item.concat());
    editor.setContent(conteudo);
}

function obterConteudo(editor: any): string {
    const conteudo = editor.getContent();
    if (conteudo) {
        return conteudo;
    }
    return '<p> </p>';
}

function focusTag(editor: any): void {
    var primeiroNode = editor.dom.select('p')[0];
    var isNull = editor.dom.isEmpty(primeiroNode);

    if (isNull) {
        editor.selection.setCursorLocation(primeiroNode);

        editor.focus();
    }
}

function retornarCssPorTamanhoPapel(tamanhoPapel: TamanhoPapel): string {
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

function setCabecalho(editor: any): string {
    const iframe: HTMLIFrameElement = document.querySelector('editor iframe');

    if (iframe.contentDocument.getElementById('container-cabecalho')) {
        return;
    }
    let parg = `<p id="iniciar-focus" autofocus>SEU TEXTO AQUI</p>`;
    const body = iframe.contentDocument.getElementsByTagName('body').item(0);
    if (body.innerHTML != `<br data-mce-bogus="1">`) {
        parg = body.innerHTML;
    }
    let txt = cabecalho() + parg;
    editor.setContent(txt);
}

export function cabecalho(): string {
    const conteudo = `<div class="container-cabecalho mceNonEditable" id="container-cabecalho">
    <div class="bloco">
      <div id="cabecalho" class="cabecalho mceNonEditable">
          <div class="row" style="border-bottom: 3px solid #ccc">
              <div class="column-1-3 text-center texto-center-all" style="height: 100px; display: flex; align-items: center;">
               <img class="logo" src="https://api-sgd.fundacaosara.com.br/Documentos/IMG/logo-pdf.jpg" height="65px">
           </div>
           <div class="column-1-3 text-center ins-numero texto-center-all" style="display: flex; align-items: center;">
              <h4><span id="tipodocid"></span> - <span id="siglaid"></span></h4>
          </div>
          <div class="column-1-3 text-center ins-numero">
              <h5 style="color: #808080">Nº DOCUMENTO:</h5>
              <h5><span id="numedodocid"></span><span id="versaoid"></span></h5>
          </div>
      </div>
  </div>
      <div class="row" id="div-titulo">
          <div style="border-bottom: 3px solid #ccc; height: 35px; width: 100%; display: flex; align-items: center; -webkit-align-items: center; display: -webkit-flex;" class="mceNonEditable" id="titulo">
            <b style='padding-right: 3px'>TÍTULO: </b> <span id="texto-titulo"></span>
          </div>
      </div>
</div>
</div>`;
    return conteudo;
}

function removeCabecalho(template: string): string {
    const temp = document.createElement('section');
    temp.innerHTML = template;
    temp.querySelectorAll('#container-cabecalho').forEach((e) => e.remove());
    return temp.innerHTML;
}

export function alterarCabecalho(
    template: string,
    mostrarSetor: boolean = false,
    mostrarNivel: boolean = false,
    mostrarTitulo1: boolean = true
): string {
    if (template) {
        const temp = document.createElement('section');
        temp.innerHTML = template;
        if (!mostrarSetor) {
            temp.querySelectorAll('#div-setor').forEach((e) => e.remove());
            template = temp.innerHTML;
        }
        if (!mostrarNivel) {
            temp.querySelectorAll('#div-nivel').forEach((e) => e.remove());
            template = temp.innerHTML;
        }
        if (!mostrarTitulo1) {
            temp.querySelectorAll('#div-titulo').forEach((e) => e.remove());
            template = temp.innerHTML;
        }
    }
    return template;
}
