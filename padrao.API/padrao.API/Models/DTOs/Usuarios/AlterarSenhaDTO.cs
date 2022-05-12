using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Usuarios
{
    public class AlterarSenhaDTO
    {
        public string Senha { get; set; }
        public string NovaSenha { get; set; }
    }
}
