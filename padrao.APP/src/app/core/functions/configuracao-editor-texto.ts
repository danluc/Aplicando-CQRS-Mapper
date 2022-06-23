export function textoContratoPadraoSistema(): string {
    return `<div class="container-cabecalho mceNonEditable" id="container-cabecalho">
    <div class="bloco">
      <div id="cabecalho" class="cabecalho mceNonEditable">
			  <div class="row" style="border-bottom: 2px solid #ccc">
				  <div class="column text-center texto-center-all div-total-center h-100-x">
				   <img class="logo" src="{LOGOEMPRESA}" height="65px">
			   </div>
			  <div class="column text-center div-total-center h-100-x">
				  <h5 style="color: #808080">{NOMEEMPRESA}</h5>
			  </div>
			</div>
		</div>
	</div>
</div>
<div class="row">
	<div class="text-center h-100-p prestacao">
		CONTRATO DE ADESÃO PARA PRESTAÇÃO DE SERVIÇOS
	</div>
</div>
<div class="row">
	<div class="h-100-p" style="margin-top: 10px;">
        {NOMEEMPRESA}, tem sua empresa estabelecida na {ENDERECOEMPRESA}, {CNPJ}, {CADASTUR}, denominada.
	</div>
    <div class="h-100-p" >
        CONTRATADA do(a) Sr(a):_____________________________, RG:_________ doravante denominado CONTRATANTE.
	</div>
    <div class="text-center h-100-p" style="margin-top: 10px;">
        <b>1.CONDIÇÕES GERAIS</b>
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.1- TRANSPORTE:</b> O ônibus utilizado para transporte do <b>CONTRATANTE</b>, durante a viagem, são a viagem, são locados pela <b>CONTRATADA</b>
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.2- BAGAGEM:</b> Será permitido o transporte de duas malas por passageiro, cujas medidas não excedem 70 x 550 x 20 cm, e um volume de mão tipo bolsa, a qual deverá permanecer sempre em poder do <b>CONTRATANTE</b>
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.3- HOSPEDAGEM:</b> Os hotel [NOMEHOTEL] utilizados em nossos roteiros são de categoria turistica.
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.4- SEGURO:</b> A <b>CONTRATADA</b> operará com ônibus devidamente acobertado por seguro qye cobre acidentes pessoais ocorridos durante a viagem rodoviária, dentro do veiculo operado por ela.
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.5- SERVIÇOS INCLUSOS:</b> Transporte em ônibus de turismo conforme item 1.1, serviço de bordo; hospedagem em Hotéis ou Pousadas de Categoria turística.
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.6- CANCELAMENTO:</b> Cancelamento por conta da {NOMEEMPRESA}: Caso não seja atingido o mínimo de 20 pagantes, a viagem poderá ser cancelada em até 30 dias.
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>1.7- FORO:</b> As partes elegem o foro de {CIDADEUFEMPRESA}, para dirigir quaisquer questões oriundas do presente ajustes.
	</div>
    <div class="h-100-p" style="margin-top: 10px;">
        <b>OBSERVAÇÕES\:</b> As partes elegem o foro de {CIDADEUFEMPRESA}, para dirigir quaisquer questões oriundas do presente ajustes.
	</div>
</div>
<div class="row h-100-p" style="margin-top: 10px;">
	<div class="column-1-2">
		Data da Viagem: {DATAVIAGEM}
	</div>
    <div class="column-1-2">
		Chegada em {CIDADEUFEMPRESA}:
	</div>
</div>
<div class="row">
<div class="h-100-p" style="margin-top: 10px;">
        {CIDADEUFEMPRESA}, ______________________________________
	</div>
</div>`;
}
