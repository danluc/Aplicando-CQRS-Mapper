using AutoMapper;
using CryptSharp;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models;
using padrao.API.Models.DTOs.Usuarios;
using padrao.API.Models.Global;
using padrao.API.Services.Email;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario
{
    public class ComandoSalvarUsuario : IRequestHandler<ParametroSalvarUsuario, ResultadoSalvarUsuario>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;
        private readonly IEmail _email;

        public ComandoSalvarUsuario(BancoDBContext bancoDBContext, IMapper mapper, IEmail email)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
            _email = email;
        }

        public async Task<ResultadoSalvarUsuario> Handle(ParametroSalvarUsuario request, CancellationToken cancellationToken)
        {
            try
            {
                var user = new Models.Usuarios
                {
                    Email = request.Dados.Email,
                    Nome = request.Dados.Nome,
                    Senha = request.Dados.Senha,
                    EmpresaId = request.Dados.EmpresaId.Value
                };

                var hasEmail = await _bancoDBContext.Usuarios.AsNoTracking().FirstOrDefaultAsync(e => e.Email.Equals(request.Dados.Email), cancellationToken);

                if (hasEmail != null)
                {
                    return new ResultadoSalvarUsuario
                    {
                        Sucesso = false,
                        Mensagem = $"Usuário {hasEmail.Email} já existe na base de dados."
                    };
                }
                user.Codigo = GerarCodigoHelper.GerarCodigo();
                user.Senha = Crypter.Blowfish.Crypt(user.Senha);
                await _bancoDBContext.AddAsync(user, cancellationToken);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);
                user.Funcao = request.FnAdmin ? await CadastrarFuncaoAgenciaAdmin(user.EmpresaId, user.Id) : await CadastrarFuncaoAgencia(user.EmpresaId, user.Id, request.Funcoes);

                var result = new UsuarioDTO
                {
                    Codigo = user.Codigo,
                    Email = user.Email,
                    Empresa = user.Empresa,
                    EmpresaId = user.EmpresaId,
                    Funcao = user.Funcao,
                    Id = user.Id,
                    Nome = user.Nome,
                    Situacao = user.Situacao
                };

                if(!request.FnAdmin)
                    _email.EmailCadastroUsuarioConsultario(result, request.NomeUsuarioLogado, request.NomeEmpresa);
                

                return new ResultadoSalvarUsuario
                {
                    Sucesso = true,
                    Usuario = result
                };
            }
            catch (Exception ex)
            {
                return new ResultadoSalvarUsuario
                {
                    Sucesso = false,
                    Mensagem = ex.Message
                };
            }
        }

        private async Task<FuncoesEmpresaUsuario> CadastrarFuncaoAgenciaAdmin(int empresaId, int usuarioId)
        {
            var dados = new FuncoesEmpresaUsuario
            {
                EmpresaId = empresaId,
                Funcoes = Constantes.FUNCAO_ADMINISTRADOR,
                UsuarioId = usuarioId
            };
            var salvo = await _bancoDBContext.AddAsync(dados);
            await _bancoDBContext.SaveChangesAsync();
            return salvo.Entity;
        }

        private async Task<FuncoesEmpresaUsuario> CadastrarFuncaoAgencia(int empresaId, int usuarioId, string funcoes)
        {
            var dados = new FuncoesEmpresaUsuario
            {
                EmpresaId = empresaId,
                Funcoes = funcoes,
                UsuarioId = usuarioId
            };
            var salvo = await _bancoDBContext.AddAsync(dados);
            await _bancoDBContext.SaveChangesAsync();
            return salvo.Entity;
        }
    }
}
