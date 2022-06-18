using MediatR;
using padrao.API.Handlers.Comandos.Contratos.CadastrarContrato;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Contratos.AtualizarContrato
{
    public class ParametrosAtualizarContrato : IRequest<ResultadoCadastrarContrato>
    {
        public ParametrosAtualizarContrato(int empresaId, ContratoDTO contrato)
        {
            EmpresaId = empresaId;
            Contrato = contrato;
        }
        public int EmpresaId { get; set; }
        public ContratoDTO Contrato { get; set; }
    }
}
