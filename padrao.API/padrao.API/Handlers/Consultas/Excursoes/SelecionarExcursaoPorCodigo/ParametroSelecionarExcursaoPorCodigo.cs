using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Excursoes.SelecionarExcursaoPorCodigo
{
    public class ParametroSelecionarExcursaoPorCodigo : IRequest<ResultadoSelecionarExcursaoPorCodigo>
    {
        public ParametroSelecionarExcursaoPorCodigo(int empresaId, string codigo)
        {
            EmpresaId = empresaId;
            Codigo = codigo;
        }
        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
