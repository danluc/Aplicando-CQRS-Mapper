using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Clientes.ListarClientesPorEmpresa
{
    public class ComandoListarClientesPorEmpresa : IRequestHandler<ParametroListarClientesPorEmpresa, ResultadoListarClientesPorEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoListarClientesPorEmpresa(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoListarClientesPorEmpresa> Handle(ParametroListarClientesPorEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var clientes = await _bancoDBContext.Clientes.Include(e => e.Endereco)
                                                        .Include(e => e.Empresa)
                                                        .Where(e => e.Situacao)
                                                        .OrderByDescending(c => c.Id)
                                                        .Skip(request.Skip)
                                                        .Take(request.Take + 1)
                                                        .ToListAsync();

                var carregarMais = clientes.Count() == request.Take + 1;

                return new ResultadoListarClientesPorEmpresa
                {
                    Clientes = _mapper.Map<List<ClienteDTO>>(clientes),
                    Sucesso = true,
                    CarregarMais = carregarMais
                };
            }
            catch (Exception ex)
            {
                return new ResultadoListarClientesPorEmpresa
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
