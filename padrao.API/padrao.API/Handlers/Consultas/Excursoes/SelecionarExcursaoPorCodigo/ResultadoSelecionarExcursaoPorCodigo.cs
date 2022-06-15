using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Excursoes.SelecionarExcursaoPorCodigo
{
    public class ResultadoSelecionarExcursaoPorCodigo : ResultadoControllerDTO
    {
        public ExcursaoDTO Excursao { get; set; }
    }
}
