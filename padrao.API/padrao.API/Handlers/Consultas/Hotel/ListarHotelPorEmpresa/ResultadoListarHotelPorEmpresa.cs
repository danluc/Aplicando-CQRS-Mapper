using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Hotel.ListarHotelPorEmpresa
{
    public class ResultadoListarHotelPorEmpresa : ResultadoPaginacaoDTO
    {
        public List<HotelDTO> Hotel { get; set; }
    }
}
