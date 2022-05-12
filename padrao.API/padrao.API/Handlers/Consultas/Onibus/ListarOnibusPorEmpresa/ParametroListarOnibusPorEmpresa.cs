using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Onibus.ListarOnibusPorEmpresa
{
    public class ParametroListarOnibusPorEmpresa : IRequest<ResultadoListarOnibusPorEmpresa>
    {
        public ParametroListarOnibusPorEmpresa(int empresaId)
        {
            EmpresaId = empresaId;
        }
        public int EmpresaId { get; set; }
    }
}
