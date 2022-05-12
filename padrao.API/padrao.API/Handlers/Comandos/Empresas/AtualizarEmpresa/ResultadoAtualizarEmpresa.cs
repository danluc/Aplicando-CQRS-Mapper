using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.AtualizarEmpresa
{
    public class ResultadoAtualizarEmpresa : ResultadoControllerDTO
    {
        public Models.Empresas Empresa { get; set; }
    }
}
