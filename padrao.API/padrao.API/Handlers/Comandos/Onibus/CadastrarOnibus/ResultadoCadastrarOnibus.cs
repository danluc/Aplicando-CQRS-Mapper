using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus
{
    public class ResultadoCadastrarOnibus : ResultadoControllerDTO
    {
        public OnibusDTO Onibus { get; set; }
    }
}
