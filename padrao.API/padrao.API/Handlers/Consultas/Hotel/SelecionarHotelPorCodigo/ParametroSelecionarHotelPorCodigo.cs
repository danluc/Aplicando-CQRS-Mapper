using MediatR;
using padrao.API.Handlers.Comandos.Hotel.CadastrarHotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Hotel.SelecionarHotelPorCodigo
{
    public class ParametroSelecionarHotelPorCodigo : IRequest<ResultadoCadastrarHotel>
    {
        public ParametroSelecionarHotelPorCodigo(int empresaId, string clienteCodigo)
        {
            EmpresaId = empresaId;
            Codigo = clienteCodigo;
        }
        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
