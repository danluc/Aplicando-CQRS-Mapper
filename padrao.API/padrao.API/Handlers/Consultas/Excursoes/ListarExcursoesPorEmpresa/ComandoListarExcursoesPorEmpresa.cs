using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Excursoes.ListarExcursoesPorEmpresa
{
    public class ComandoListarExcursoesPorEmpresa : IRequestHandler<ParametroListarExcursoesPorEmpresa, ResultadoListarExcursoesPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarExcursoesPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarExcursoesPorEmpresa> Handle(ParametroListarExcursoesPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = new List<Models.Excursoes>();
                if (String.IsNullOrEmpty(request.NomeCpf))
                {
                    dados = await _bancoDBContext.Excursoes.Include("EnderecoDestino")
                                                            .Include("EnderecoSaida")
                                                            .Include("Empresa")
                                                            .Include("OnibusMotoristas")
                                                            .Where(e => e.Situacao)
                                                            .OrderBy(c => c.DataIncio)
                                                            .Skip(request.Skip)
                                                            .Take(request.Take + 1)
                                                            .ToListAsync();
                }
                else
                {
                    dados = await _bancoDBContext.Excursoes.Include("EnderecoDestino")
                                                            .Include("EnderecoSaida")
                                                            .Include("Empresa")
                                                            .Include("OnibusMotoristas")
                                                            .Where(e => e.Situacao && (e.Nome.ToUpper().Contains(request.NomeCpf)))
                                                            .OrderBy(c => c.Nome)
                                                            .Skip(request.Skip)
                                                            .Take(request.Take + 1)
                                                            .ToListAsync();
                }

                return new ResultadoListarExcursoesPorEmpresa
                {
                    Excursoes = _mapper.Map<List<ExcursaoDTO>>(dados),
                    Sucesso = true,
                    CarregarMais = dados.Count() == request.Take + 1
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarExcursoesPorEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
