using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Onibus.ListarOnibusPorEmpresa
{
    public class ResultadoListarOnibusPorEmpresa : ResultadoControllerDTO
    {
        public List<OnibusDTO> Onibus { get; set; }
    }
}
