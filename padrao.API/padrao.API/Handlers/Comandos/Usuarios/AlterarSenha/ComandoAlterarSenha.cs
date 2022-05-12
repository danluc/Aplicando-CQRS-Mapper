using CryptSharp;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarSenha
{
    public class ComandoAlterarSenha : IRequestHandler<ParametroAlterarSenha, ResultadoControllerDTO>
    {
        private readonly BancoDBContext _bancoDBContext;

        public ComandoAlterarSenha(BancoDBContext bancoDBContext)
        {
            _bancoDBContext = bancoDBContext;
        }

        public async Task<ResultadoControllerDTO> Handle(ParametroAlterarSenha request, CancellationToken cancellationToken)
        {
            try
            {
                var usuario = await _bancoDBContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(e => e.Id == request.UsuariosId);

                if (!Crypter.CheckPassword(request.Dados.Senha, usuario.Senha))
                {
                    return new ResultadoControllerDTO
                    {
                        Mensagem = $"Senha atual incorreta.",
                        Sucesso = false
                    };
                }

                usuario.Senha = Crypter.Blowfish.Crypt(request.Dados.NovaSenha);
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
