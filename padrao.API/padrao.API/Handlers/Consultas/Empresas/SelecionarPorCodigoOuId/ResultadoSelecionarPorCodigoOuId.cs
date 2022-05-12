using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Empresas.SelecionarPorCodigoOuId
{
    public class ResultadoSelecionarPorCodigoOuId : ResultadoControllerDTO
    {
        public Models.Empresas Empresa { get; set; }
    }
}
