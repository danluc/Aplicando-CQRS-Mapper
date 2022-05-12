using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Usuarios;

namespace padrao.API.Handlers.Comandos.Usuarios.SalvarUsuario
{
    public class ResultadoSalvarUsuario : ResultadoControllerDTO
    {
        public UsuarioDTO Usuario { get; set; }
    }
}
