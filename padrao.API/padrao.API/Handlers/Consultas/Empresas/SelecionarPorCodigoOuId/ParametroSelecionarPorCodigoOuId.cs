using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Empresas.SelecionarPorCodigoOuId
{
    public class ParametroSelecionarPorCodigoOuId : IRequest<ResultadoSelecionarPorCodigoOuId>
    {
        public ParametroSelecionarPorCodigoOuId(int? empresaId, string codigo)
        {
            EmpresaId = empresaId;
            Codigo = codigo;
        }

        public int? EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
