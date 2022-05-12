using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarStatus
{
    public class ComandoAlterarStatus : IRequestHandler<ParametroAlterarStatus, ResultadoControllerDTO>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoAlterarStatus(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoControllerDTO> Handle(ParametroAlterarStatus request, CancellationToken cancellationToken)
        {
            try
            {
                var usuario = await _bancoDBContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(e => e.Codigo == request.Codigo);

                if (usuario == null)
                {
                    return new ResultadoControllerDTO
                    {
                        Mensagem = "Usuário não encontrado.",
                        Sucesso = false
                    };
                }

                usuario.Situacao = !usuario.Situacao;
                usuario.DataAlteracao = DateTime.Now;
                _bancoDBContext.Update(usuario);
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