using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.CadastrarCliente
{
    public class ResultadoCadastrarCliente : ResultadoControllerDTO
    {
        public ClienteDTO Cliente { get; set; }
    }
}
