using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AtualizarUsuario
{
    public class ComandoAtualizarUsuario : IRequestHandler<ParametroAtualizarUsuario, ResultadoSalvarUsuario>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarUsuario(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoSalvarUsuario> Handle(ParametroAtualizarUsuario request, CancellationToken cancellationToken)
        {
            try
            {
                var user = _mapper.Map<Models.Usuarios>(request.Dados);
                var usuarios = await _bancoDBContext.Usuarios.FirstOrDefaultAsync(e => e.Id.Equals(user.Id), cancellationToken);
                if (usuarios == null)
                {
                    return new ResultadoSalvarUsuario
                    {
                        Sucesso = false,
                        Mensagem = $"Usuário não encontrado na base de dados."
                    };
                }

                usuarios.Nome = user.Nome;
                usuarios.DataAlteracao = DateTime.Now;

                 _bancoDBContext.Update(usuarios);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                var result = _mapper.Map<UsuarioDTO>(request.Dados);

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
    }
}
