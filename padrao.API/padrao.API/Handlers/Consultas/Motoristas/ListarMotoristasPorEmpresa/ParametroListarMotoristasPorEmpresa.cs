using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa
{
    public class ParametroListarMotoristasPorEmpresa : IRequest<ResultadoListarMotoristasPorEmpresa>
    {
        public ParametroListarMotoristasPorEmpresa(int empresaId)
        {
            EmpresaId = empresaId;
        }
        public int EmpresaId { get; set; }
    }
}
