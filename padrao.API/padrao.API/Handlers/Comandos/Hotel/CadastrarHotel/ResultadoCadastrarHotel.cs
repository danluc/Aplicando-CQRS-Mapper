using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Hotel.CadastrarHotel
{
    public class ResultadoCadastrarHotel : ResultadoControllerDTO
    {
        public HotelDTO Hotel { get; set; }
    }
}
