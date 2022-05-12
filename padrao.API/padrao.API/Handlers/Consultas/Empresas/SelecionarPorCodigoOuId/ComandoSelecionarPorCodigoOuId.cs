using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Empresas.SelecionarPorCodigoOuId
{
    public class ComandoSelecionarPorCodigoOuId : IRequestHandler<ParametroSelecionarPorCodigoOuId, ResultadoSelecionarPorCodigoOuId>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoSelecionarPorCodigoOuId(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoSelecionarPorCodigoOuId> Handle(ParametroSelecionarPorCodigoOuId request, CancellationToken cancellationToken)
        {
            try
            {
                var dados = await _bancoDBContext.Empresas.AsNoTracking().Include("Usuarios").Include("Usuarios.Funcao").Include("Endereco")
                                                                    .FirstOrDefaultAsync(e => e.Codigo.Equals(request.Codigo) ||
                                                                    e.Id.Equals(request.EmpresaId), cancellationToken);
                foreach (var item in dados.Usuarios)
                    item.Senha = string.Empty;


                return new ResultadoSelecionarPorCodigoOuId
                {
                    Sucesso = dados != null,
                    Empresa = dados
                };
            }
            catch (Exception ex)
            {
                return new ResultadoSelecionarPorCodigoOuId
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
