using CryptSharp;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Login
{
    public class ComandoLogin : IRequestHandler<ParametroLogin, ResultadoLogin>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IConfiguration _config;

        public ComandoLogin(BancoDBContext bancoDBContext, IConfiguration config)
        {
            _bancoDBContext = bancoDBContext;
            _config = config;
        }

        public async Task<ResultadoLogin> Handle(ParametroLogin request, CancellationToken cancellationToken)
        {
            try
            {
                var usuario = await _bancoDBContext.Usuarios.Include("Empresa").Include("Funcao")
                                                            .FirstOrDefaultAsync(e => e.Email.Equals(request.Dados.Email) && e.Situacao);
                if(usuario == null)
                {
                    return new ResultadoLogin
                    {
                        Mensagem = $"Usuário {request.Dados.Email} não encontrado.",
                        Sucesso = false
                    };
                }

                if (!Crypter.CheckPassword(request.Dados.Senha, usuario.Senha))
                {
                    return new ResultadoLogin
                    {
                        Mensagem = $"Usuário ou senha invalida.",
                        Sucesso = false
                    };
                }

                usuario.Empresa.Usuarios = null;
                usuario.Funcao.Usuario = null;

                var result = new UsuarioDTO
                {
                    Codigo = usuario.Codigo,
                    Email = usuario.Email,
                    Empresa = usuario.Empresa,
                    EmpresaId = usuario.EmpresaId,
                    Funcao = usuario.Funcao,
                    Id = usuario.Id,
                    Nome = usuario.Nome,
                    Situacao = usuario.Situacao,
                };

                result.Token = LoginHelper.GerarToken(result, _config);

                return new ResultadoLogin
                {
                    Sucesso = true,
                    Usuario = result
                };
            }
            catch (Exception ex)
            {
                return new ResultadoLogin
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
