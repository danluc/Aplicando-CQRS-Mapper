using padrao.API.Models.DTOs.Usuarios;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Services.Email
{
    public interface IEmail
    {
        void EmailCadastroUsuarioConsultario(UsuarioDTO dados, string usuarioLogado, string nomeEmpresa);
    }
}
