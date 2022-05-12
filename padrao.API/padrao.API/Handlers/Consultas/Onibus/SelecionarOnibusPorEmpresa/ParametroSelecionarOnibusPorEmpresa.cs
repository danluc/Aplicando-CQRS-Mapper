using MediatR;
using padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Onibus.SelecionarOnibusPorEmpresa
{
    public class ParametroSelecionarOnibusPorEmpresa : IRequest<ResultadoCadastrarOnibus>
    {
        public ParametroSelecionarOnibusPorEmpresa(int empresaId, string clienteCodigo)
        {
            EmpresaId = empresaId;
            Codigo = clienteCodigo;
        }
        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
