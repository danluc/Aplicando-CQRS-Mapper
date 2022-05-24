using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Models.DTOs
{
    public class ResultadoPaginacaoDTO : ResultadoControllerDTO
    {
        public bool CarregarMais { get; set; } = false;
    }
}
