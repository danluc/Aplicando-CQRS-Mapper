using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Hotel.CadastrarHotel
{
    public class ComandoCadastrarHotel : IRequestHandler<ParametroCadastrarHotel, ResultadoCadastrarHotel>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarHotel(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarHotel> Handle(ParametroCadastrarHotel request, CancellationToken cancellationToken)
        {
            try{
                var dados = await _bancoDBContext.Hotel.AsNoTracking()
                                                       .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId
                                                                            && e.Nome == request.Hotel.Nome);
                if (dados != null)
                {
                    var dTO = _mapper.Map<HotelDTO>(dados);
                    return new ResultadoCadastrarHotel
                    {
                        Mensagem = "Hotel já cadastrado!",
                        Sucesso = false,
                        Hotel = dTO
                    };
                }

                request.Hotel.EmpresaId = request.EmpresaId;
                request.Hotel.Codigo = GerarCodigoHelper.GerarCodigo();
                var hotel = _mapper.Map<Models.Hotel>(request.Hotel);
                hotel.DataCadastro = DateTime.Now;
                await _bancoDBContext.AddAsync(hotel);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarHotel
                {
                    Sucesso = true,
                    Hotel = _mapper.Map<HotelDTO>(hotel)
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarHotel
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
