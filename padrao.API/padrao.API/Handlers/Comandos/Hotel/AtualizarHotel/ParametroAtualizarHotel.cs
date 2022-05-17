using MediatR;
using padrao.API.Handlers.Comandos.Hotel.CadastrarHotel;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Hotel.AtualizarHotel
{
    public class ParametroAtualizarHotel : IRequest<RespostaAtualizarHotel>
    {
        public ParametroAtualizarHotel(int empresaId, HotelDTO hotel)
        {
            EmpresaId = empresaId;
            Hotel = hotel;
        }
        public int EmpresaId { get; set; }
        public HotelDTO Hotel { get; set; }
    }
}
