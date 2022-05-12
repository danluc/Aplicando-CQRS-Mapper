using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarEmpresa
{
    public class ResultadoCadastrarEmpresa : ResultadoControllerDTO
    {
        public Models.Empresas Empresa { get; set; }
    }
}
