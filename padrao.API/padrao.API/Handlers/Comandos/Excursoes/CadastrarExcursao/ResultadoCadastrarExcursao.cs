﻿using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.CadastrarExcursao
{
    public class ResultadoCadastrarExcursao : ResultadoControllerDTO
    {
        public ExcursaoDTO Excursao { get; set; }
    }
}
