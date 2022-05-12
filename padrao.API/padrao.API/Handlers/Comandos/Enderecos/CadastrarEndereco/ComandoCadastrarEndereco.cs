using MediatR;
using padrao.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Enderecos.CadastrarEndereco
{
    public class ComandoCadastrarEndereco : IRequestHandler<ParametroCadastrarEndereco, ResultadoCadastrarEndereco>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoCadastrarEndereco(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoCadastrarEndereco> Handle(ParametroCadastrarEndereco request, CancellationToken cancellationToken)
        {
            try
            {
                await _bancoDBContext.AddAsync(request.Dados, cancellationToken);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarEndereco
                {
                    Sucesso = true,
                    Endereco = request.Dados
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarEndereco
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
