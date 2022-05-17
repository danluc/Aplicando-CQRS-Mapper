using MediatR;

namespace padrao.API.Handlers.Consultas.Hotel.ListarHotelPorEmpresa
{
    public class ParametroListarHotelPorEmpresa : IRequest<ResultadoListarHotelPorEmpresa>
    {
        public ParametroListarHotelPorEmpresa(int empresaId)
        {
            EmpresaId = empresaId;
        }
        public int EmpresaId { get; set; }
    }
}
