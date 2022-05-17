using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Hotel.CadastrarHotel;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Hotel.SelecionarHotelPorCodigo
{
    public class ComandoSelecionarHotelPorCodigo : IRequestHandler<ParametroSelecionarHotelPorCodigo, ResultadoCadastrarHotel>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarHotelPorCodigo(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarHotel> Handle(ParametroSelecionarHotelPorCodigo request, CancellationToken cancellationToken)
        {

            try
            {
                var dados = await _bancoDBContext.Hotel.AsNoTracking().Include(e => e.Empresa).Include(e => e.Endereco)
                                                           .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

                return new ResultadoCadastrarHotel
                {
                    Hotel = _mapper.Map<HotelDTO>(dados),
                    Sucesso = true
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
