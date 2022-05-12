using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs.Usuarios
{
    public class RegistrarDTO
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public int? EmpresaId { get; set; }
        public string Funcoes { get; set; }
    }
}
