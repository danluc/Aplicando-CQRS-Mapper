export function obterIdadeEmAnosMesesDias(data: Date): string {
    const dataConvert = new Date(data);
    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);
    dataConvert.setHours(0, 0, 0, 0);

    var dias = dataAtual.getDate() - dataConvert.getDate();
    var meses = dataAtual.getMonth() - dataConvert.getMonth();
    var anos = dataAtual.getFullYear() - dataConvert.getFullYear();

    if (dias < 0) {
        dias += new Date(
            dataConvert.getFullYear(),
            dataConvert.getMonth() + 1,
            0
        ).getDate();
        meses--;
    }
    if (meses < 0) {
        meses += 12;
        anos--;
    }

    const ano = anos > 1 ? 'anos' : 'ano';
    const mes = meses > 1 ? 'meses' : 'mês';
    const dia = dias > 1 ? 'dias' : 'dia';
    return `${anos} ${ano}, ${meses} ${mes}, ${dias} ${dia}`;
}
