using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Login
{
    public class ResultadoLogin : ResultadoControllerDTO
    {
        public UsuarioDTO Usuario { get; set; }
    }
}
