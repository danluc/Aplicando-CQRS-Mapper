export function ConverterValorDecimal(valor: number): string {
    return (Math.round(valor * 100) / 100).toFixed(2).toString();
}
