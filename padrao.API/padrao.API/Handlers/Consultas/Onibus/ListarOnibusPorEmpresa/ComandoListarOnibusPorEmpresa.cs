using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Onibus.ListarOnibusPorEmpresa
{
    public class ComandoListarOnibusPorEmpresa : IRequestHandler<ParametroListarOnibusPorEmpresa, ResultadoListarOnibusPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarOnibusPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarOnibusPorEmpresa> Handle(ParametroListarOnibusPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = new List<Models.Onibus>();
                if (String.IsNullOrEmpty(request.NomeCpf))
                {
                    dados = await _bancoDBContext.Onibus.Include(e => e.Empresa)
                                                        .Where(e => e.Situacao)
                                                        .OrderBy(c => c.Nome)
                                                        .Skip(request.Skip)
                                                        .Take(request.Take + 1)
                                                        .ToListAsync();
                }
                else
                {
                    dados = await _bancoDBContext.Onibus.Include(e => e.Empresa)
                                                       .Where(e => e.Situacao && (e.Nome.ToUpper().Contains(request.NomeCpf)))
                                                       .OrderBy(c => c.Nome)
                                                       .Skip(request.Skip)
                                                       .Take(request.Take + 1)
                                                       .ToListAsync();
                }

                return new ResultadoListarOnibusPorEmpresa
                {
                    Onibus = _mapper.Map<List<OnibusDTO>>(dados),
                    Sucesso = true,
                    CarregarMais = dados.Count() == request.Take + 1
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarOnibusPorEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
