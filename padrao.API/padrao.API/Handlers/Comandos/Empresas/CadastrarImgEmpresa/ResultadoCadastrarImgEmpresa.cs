using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarImgEmpresa
{
    public class ResultadoCadastrarImgEmpresa : ResultadoControllerDTO
    {
        public string Url { get; set; }
    }
}
