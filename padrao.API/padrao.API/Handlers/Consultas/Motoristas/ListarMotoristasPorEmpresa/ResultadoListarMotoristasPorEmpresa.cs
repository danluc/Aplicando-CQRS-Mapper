using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa
{
    public class ResultadoListarMotoristasPorEmpresa : ResultadoPaginacaoDTO
    {
        public List<MotoristaDTO> Motoristas { get; set; }
    }
}
