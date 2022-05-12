using MediatR;
using padrao.API.Models.DTOs.Motoristas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Motoristas.CadastrarMotorista
{
    public class ParametroCadastrarMotorista : IRequest<ResultadoCadastrarMotorista>
    {
        public ParametroCadastrarMotorista(int empresaId, MotoristaDTO motorista)
        {
            EmpresaId = empresaId;
            Motorista = motorista;
        }
        public int EmpresaId { get; set; }
        public MotoristaDTO Motorista { get; set; }
    }
}
