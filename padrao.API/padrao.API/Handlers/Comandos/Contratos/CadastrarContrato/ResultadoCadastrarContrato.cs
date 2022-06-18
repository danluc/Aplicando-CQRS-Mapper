using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Contratos.CadastrarContrato
{
    public class ResultadoCadastrarContrato : ResultadoControllerDTO
    {
        public ContratoDTO Contrato { get; set; }
    }
}
