using MediatR;
using padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario;
using padrao.API.Models.DTOs.Usuarios;

namespace padrao.API.Handlers.Comandos.Usuarios.AtualizarUsuario
{
    public class ParametroAtualizarUsuario : IRequest<ResultadoSalvarUsuario>
    {
        public ParametroAtualizarUsuario(UsuarioDTO dados)
        {
            Dados = dados;
        }
        public UsuarioDTO Dados { get; set; }
    }
}
