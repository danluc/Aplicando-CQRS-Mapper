using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.AtualizarExcursao
{
    public class ResultadoAtualizarExcursao : ResultadoControllerDTO
    {
        public ExcursaoDTO Excursao { get; set; }
    }
}
