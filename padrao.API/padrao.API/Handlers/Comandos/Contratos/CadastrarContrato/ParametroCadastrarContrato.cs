using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Contratos.CadastrarContrato
{
    public class ParametroCadastrarContrato : IRequest<ResultadoCadastrarContrato>
    {
        public ParametroCadastrarContrato(int empresaId, string contrato)
        {
            EmpresaId = empresaId;
            Contrato = contrato;
        }
        public int EmpresaId { get; set; }
        public string Contrato { get; set; }
    }
}
