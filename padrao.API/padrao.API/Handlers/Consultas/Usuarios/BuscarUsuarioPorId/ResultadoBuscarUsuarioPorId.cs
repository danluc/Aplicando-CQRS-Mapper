using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Usuarios;

namespace padrao.API.Handlers.Consultas.Usuarios.BuscarUsuarioPorId
{
    public class ResultadoBuscarUsuarioPorId : ResultadoControllerDTO
    {
        public UsuarioDTO Usuario { get; set; }
    }
}
