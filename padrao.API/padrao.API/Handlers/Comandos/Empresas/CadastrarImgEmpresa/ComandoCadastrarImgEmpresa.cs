using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using padrao.API.Data;
using padrao.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarImgEmpresa
{
    public class ComandoCadastrarImgEmpresa : IRequestHandler<ParametroCadastrarImgEmpresa, ResultadoCadastrarImgEmpresa>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IConfiguration _configuration;

        public ComandoCadastrarImgEmpresa(BancoDBContext bancoDBContext, IConfiguration configuration)
        {
            _bancoDBContext = bancoDBContext;
            _configuration = configuration;
        }

        public async Task<ResultadoCadastrarImgEmpresa> Handle(ParametroCadastrarImgEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                if(!(request.Arquivo.Length > 0))
                {
                    return new ResultadoCadastrarImgEmpresa
                    {
                        Sucesso = false,
                        Mensagem = "Nenhum arquivo foi encontrado na requisição."
                    };
                }

                var empresa = await _bancoDBContext.Empresas.AsNoTracking().FirstOrDefaultAsync(e => e.Id == request.EmpresaId);
                empresa.Imagem = await ArquivoHelper.SalvarArquivo(_configuration.GetValue<string>("Imagens:Clinica:Salvar"), request.Arquivo);
                empresa.DataAlteracao = DateTime.Now;

                _bancoDBContext.Empresas.Update(empresa);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                var caminhoArquivo = _configuration.GetValue<string>("Imagens:Clinica:Recuperar") + $"{empresa.Imagem}";
                caminhoArquivo = $"{_configuration.GetValue<string>("linkSistema")}{caminhoArquivo}".Replace("\\", "/");

                return new ResultadoCadastrarImgEmpresa
                {
                    Sucesso = true,
                    Url = caminhoArquivo
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarImgEmpresa
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }
    }
}
