using MediatR;
using padrao.API.Handlers.Comandos.Contratos.CadastrarContrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Contratos.SelecionarContratoPorEmpresa
{
    public class ParametroSelecionarContratoPorEmpresa : IRequest<ResultadoCadastrarContrato>
    {
        public ParametroSelecionarContratoPorEmpresa(int empresaId)
        {
            EmpresaId = empresaId;
        }
        public int EmpresaId { get; set; }
    }
}
