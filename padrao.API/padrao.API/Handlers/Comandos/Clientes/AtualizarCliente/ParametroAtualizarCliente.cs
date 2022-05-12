using MediatR;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.AtualizarCliente
{
    public class ParametroAtualizarCliente : IRequest<ResultadoCadastrarCliente>
    {
        public ParametroAtualizarCliente(int empresaId, ClienteDTO cliente)
        {
            EmpresaId = empresaId;
            Cliente = cliente;
        }
        public int EmpresaId { get; set; }
        public ClienteDTO Cliente { get; set; }
    }
}
