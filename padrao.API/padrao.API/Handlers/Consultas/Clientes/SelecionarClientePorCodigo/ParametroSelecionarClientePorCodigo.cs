using MediatR;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Clientes.SelecionarClientePorCodigo
{
    public class ParametroSelecionarClientePorCodigo : IRequest<ResultadoCadastrarCliente>
    {
        public ParametroSelecionarClientePorCodigo(int empresaId, string clienteCodigo)
        {
            EmpresaId = empresaId;
            Codigo = clienteCodigo;
        }
        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
