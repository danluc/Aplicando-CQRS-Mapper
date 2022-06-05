using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Hotel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Hotel.ListarHotelPorEmpresa
{
    public class ComandoListarHotelPorEmpresa : IRequestHandler<ParametroListarHotelPorEmpresa, ResultadoListarHotelPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarHotelPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarHotelPorEmpresa> Handle(ParametroListarHotelPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = new List<Models.Hotel>();
                if (String.IsNullOrEmpty(request.NomeCpf))
                {
                    dados = await _bancoDBContext.Hotel.Include(e => e.Empresa).Include(e => e.Endereco)
                                                        .Where(e => e.Situacao)
                                                        .OrderBy(c => c.Nome)
                                                        .Skip(request.Skip)
                                                        .Take(request.Take + 1)
                                                        .ToListAsync();
                }
                else
                {
                    dados = await _bancoDBContext.Hotel.Include(e => e.Empresa).Include(e => e.Endereco)
                                                       .Where(e => e.Situacao && (e.Nome.ToUpper().Contains(request.NomeCpf)))
                                                       .OrderBy(c => c.Nome)
                                                       .Skip(request.Skip)
                                                       .Take(request.Take + 1)
                                                       .ToListAsync();
                }


                return new ResultadoListarHotelPorEmpresa
                {
                    Hotel = _mapper.Map<List<HotelDTO>>(dados),
                    Sucesso = true,
                    CarregarMais = dados.Count() == request.Take + 1
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarHotelPorEmpresa
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
