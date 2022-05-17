using MediatR;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Hotel.CadastrarHotel
{
    public class ParametroCadastrarHotel : IRequest<ResultadoCadastrarHotel>
    {
        public ParametroCadastrarHotel(int empresaId, HotelDTO hotel)
        {
            EmpresaId = empresaId;
            Hotel = hotel;
        }
        public int EmpresaId { get; set; }
        public HotelDTO Hotel { get; set; }
    }
}
