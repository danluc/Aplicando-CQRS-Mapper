using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarEmpresa
{
    public class ComandoCadastrarEmpresa : IRequestHandler<ParametroCadastrarEmpresa, ResultadoCadastrarEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoCadastrarEmpresa(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoCadastrarEmpresa> Handle(ParametroCadastrarEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                if (request.EmpresaDoSistema)
                {
                    request.Dados = new Models.Empresas
                    {
                        Nome = "Agência criada pelo Sistema"
                    };
                }
                request.Dados.Codigo = GerarCodigoHelper.GerarCodigo();
                await _bancoDBContext.Empresas.AddAsync(request.Dados, cancellationToken);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);
                return new ResultadoCadastrarEmpresa
                {
                    Sucesso = true,
                    Empresa = request.Dados
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
