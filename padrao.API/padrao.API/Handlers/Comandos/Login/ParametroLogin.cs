using MediatR;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Login
{
    public class ParametroLogin : IRequest<ResultadoLogin>
    {
        public ParametroLogin(LoginDTO loginDTO)
        {
            Dados = loginDTO;
        }

        public LoginDTO Dados { get; set; }
    }
}
