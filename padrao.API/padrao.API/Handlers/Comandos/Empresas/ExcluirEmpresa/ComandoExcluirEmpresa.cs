using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.ExcluirEmpresa
{
    public class ComandoExcluirEmpresa : IRequestHandler<ParametroExcluirEmpresa, ResultadoControllerDTO>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoExcluirEmpresa(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoControllerDTO> Handle(ParametroExcluirEmpresa request, CancellationToken cancellationToken)
        {
            try
            {
                var empresa = request.Empresa;
                if (empresa == null)
                {
                    return new ResultadoControllerDTO
                    {
                        Mensagem = "Empresa não encontrada para excluir.",
                        Sucesso = false
                    };
                }

                 _bancoDBContext.Empresas.Remove(empresa);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoControllerDTO
                {
                    Sucesso = true
                };
            }
            catch (Exception ex)
            {
                return new ResultadoControllerDTO
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
