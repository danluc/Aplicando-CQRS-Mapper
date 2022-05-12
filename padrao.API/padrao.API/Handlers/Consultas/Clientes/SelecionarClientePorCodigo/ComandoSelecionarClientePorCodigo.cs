using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Clientes.SelecionarClientePorCodigo
{
    public class ComandoSelecionarClientePorCodigo : IRequestHandler<ParametroSelecionarClientePorCodigo, ResultadoCadastrarCliente>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoSelecionarClientePorCodigo(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarCliente> Handle(ParametroSelecionarClientePorCodigo request, CancellationToken cancellationToken)
        {
            try
            {
                var cliente = await _bancoDBContext.Clientes.AsNoTracking().Include(e => e.Endereco).Include(e => e.Empresa)
                                                           .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);

                return new ResultadoCadastrarCliente
                {
                    Cliente = _mapper.Map<ClienteDTO>(cliente),
                    Sucesso = true
                };

            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarCliente
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
