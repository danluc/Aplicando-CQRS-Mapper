using MediatR;
using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarSenha
{
    public class ParametroAlterarSenha : IRequest<ResultadoControllerDTO>
    {
        public ParametroAlterarSenha(AlterarSenhaDTO dados, int usuarioId)
        {
            Dados = dados;
            UsuariosId = usuarioId;
        }
        public AlterarSenhaDTO Dados { get; set; }
        public int UsuariosId { get; set; }
    }
}
