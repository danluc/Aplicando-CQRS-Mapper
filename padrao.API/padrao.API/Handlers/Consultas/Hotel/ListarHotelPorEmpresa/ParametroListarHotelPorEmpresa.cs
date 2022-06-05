using MediatR;

namespace padrao.API.Handlers.Consultas.Hotel.ListarHotelPorEmpresa
{
    public class ParametroListarHotelPorEmpresa : IRequest<ResultadoListarHotelPorEmpresa>
    {
        public ParametroListarHotelPorEmpresa(int empresaId, int skip, int take, string nomeCpf)
        {
            EmpresaId = empresaId;
            NomeCpf = nomeCpf;
            Skip = skip;
            Take = take;
        }
        public int EmpresaId { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public string NomeCpf { get; set; }
    }
}
