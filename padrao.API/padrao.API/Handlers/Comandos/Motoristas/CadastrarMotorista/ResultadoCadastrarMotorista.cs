using padrao.API.Models.DTOs;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista
{
    public class ResultadoCadastrarMotorista : ResultadoControllerDTO
    {
        public MotoristaDTO Motorista { get; set; }
    }
}
