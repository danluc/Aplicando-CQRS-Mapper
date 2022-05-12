using MediatR;
using padrao.API.Models.DTOs.Clientes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.CadastrarCliente
{
    public class ParametroCadastrarCliente : IRequest<ResultadoCadastrarCliente>
    {
        public ParametroCadastrarCliente(int empresaId, ClienteDTO cliente)
        {
            EmpresaId = empresaId;
            Cliente = cliente;
        }
        public int EmpresaId { get; set; }
        public ClienteDTO Cliente { get; set; }
    }
}
