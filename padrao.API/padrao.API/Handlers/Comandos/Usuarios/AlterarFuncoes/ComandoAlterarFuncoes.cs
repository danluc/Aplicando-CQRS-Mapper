using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarFuncoes
{
    public class ComandoAlterarFuncoes : IRequestHandler<ParametroAlterarFuncoes, ResultadoControllerDTO>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoAlterarFuncoes(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoControllerDTO> Handle(ParametroAlterarFuncoes request, CancellationToken cancellationToken)
        {
            try
            {
                var usuario = await _bancoDBContext.Usuarios.AsNoTracking().Include("Funcao").FirstOrDefaultAsync(e => e.Codigo == request.Codigo);

                if (usuario == null)
                {
                    return new ResultadoControllerDTO
                    {
                        Mensagem = "Usuário não encontrado.",
                        Sucesso = false
                    };
                }

                usuario.Funcao.Funcoes = request.Funcoes.Funcao;
                usuario.DataAlteracao = DateTime.Now;
                usuario.Funcao.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(usuario.Funcao);
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
