using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa
{
    public class ComandoListarMotoristasPorEmpresa : IRequestHandler<ParametroListarMotoristasPorEmpresa, ResultadoListarMotoristasPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarMotoristasPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarMotoristasPorEmpresa> Handle(ParametroListarMotoristasPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = new List<Models.Motoristas>();
                if (String.IsNullOrEmpty(request.NomeCpf))
                {
                    dados = await _bancoDBContext.Motoristas.Include(e => e.Empresa)
                                                        .Where(e => e.Situacao)
                                                        .OrderBy(c => c.Nome)
                                                        .Skip(request.Skip)
                                                        .Take(request.Take + 1)
                                                        .ToListAsync();
                }
                else
                {
                    dados = await _bancoDBContext.Motoristas.Include(e => e.Empresa)
                                                       .Where(e => e.Situacao && (e.Nome.ToUpper().Contains(request.NomeCpf)))
                                                       .OrderBy(c => c.Nome)
                                                       .Skip(request.Skip)
                                                       .Take(request.Take + 1)
                                                       .ToListAsync();
                }

                return new ResultadoListarMotoristasPorEmpresa
                {
                    Motoristas = _mapper.Map<List<MotoristaDTO>>(dados),
                    Sucesso = true,
                    CarregarMais = dados.Count() == request.Take + 1
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarMotoristasPorEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
