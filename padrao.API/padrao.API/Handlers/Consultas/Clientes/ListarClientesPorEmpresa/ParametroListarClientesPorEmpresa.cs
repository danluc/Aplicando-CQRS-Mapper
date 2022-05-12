using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Clientes.ListarClientesPorEmpresa
{
    public class ParametroListarClientesPorEmpresa : IRequest<ResultadoListarClientesPorEmpresa>
    {
        public ParametroListarClientesPorEmpresa(int empresaId)
        {
            EmpresaId = empresaId;
        }
        public int EmpresaId { get; set; }
    }
}
