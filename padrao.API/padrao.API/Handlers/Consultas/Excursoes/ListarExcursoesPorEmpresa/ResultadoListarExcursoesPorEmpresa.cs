using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Excursoes.ListarExcursoesPorEmpresa
{
    public class ResultadoListarExcursoesPorEmpresa : ResultadoPaginacaoDTO
    {
        public List<ExcursaoDTO> Excursoes { get; set; }
    }
}
