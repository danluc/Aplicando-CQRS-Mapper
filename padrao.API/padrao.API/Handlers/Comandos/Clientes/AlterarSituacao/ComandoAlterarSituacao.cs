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

namespace padrao.API.Handlers.Comandos.Clientes.AlterarSituacao
{
    public class ComandoAlterarSituacao : IRequestHandler<ParametroAlterarSituacao, ResultadoCadastrarCliente>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAlterarSituacao(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarCliente> Handle(ParametroAlterarSituacao request, CancellationToken cancellationToken)
        {
            try
            {
                var hasCliente = await _bancoDBContext.Clientes.AsNoTracking()
                                                        .FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Codigo);
                if (hasCliente == null)
                {
                    return new ResultadoCadastrarCliente
                    {
                        Mensagem = "Cliente não encotrado!",
                        Sucesso = false
                    };
                }
                hasCliente.Situacao = !hasCliente.Situacao;
                hasCliente.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(hasCliente);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarCliente
                {
                    Cliente = _mapper.Map<ClienteDTO>(hasCliente),
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
