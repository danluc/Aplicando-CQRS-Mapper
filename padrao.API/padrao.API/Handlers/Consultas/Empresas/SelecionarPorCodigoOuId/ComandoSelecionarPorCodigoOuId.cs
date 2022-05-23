using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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
        private readonly IConfiguration _configuration;

        public ComandoSelecionarPorCodigoOuId(BancoDBContext bancoDBContext, IConfiguration configuration)
        {
            _bancoDBContext = bancoDBContext;
            _configuration = configuration;
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


                if(dados.Imagem != null)
                {
                    var caminhoArquivo = _configuration.GetValue<string>("Imagens:Agencia:Recuperar") + $"{dados.Imagem}";
                    dados.Imagem = $"{_configuration.GetValue<string>("linkSistema")}{caminhoArquivo}".Replace("\\", "/");
                }

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
