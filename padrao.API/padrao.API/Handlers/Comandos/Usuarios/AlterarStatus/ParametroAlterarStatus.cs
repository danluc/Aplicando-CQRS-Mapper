using MediatR;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Usuarios.AlterarStatus
{
    public class ParametroAlterarStatus : IRequest<ResultadoControllerDTO>
    {
        public ParametroAlterarStatus(string codigo)
        {
            Codigo = codigo;
        }
        public string Codigo { get; set; }
    }
}
