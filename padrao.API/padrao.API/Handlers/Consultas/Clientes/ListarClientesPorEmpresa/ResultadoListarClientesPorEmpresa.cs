using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Clientes.ListarClientesPorEmpresa
{
    public class ResultadoListarClientesPorEmpresa : ResultadoPaginacaoDTO
    {
        public List<ClienteDTO> Clientes { get; set; }
    }
}
