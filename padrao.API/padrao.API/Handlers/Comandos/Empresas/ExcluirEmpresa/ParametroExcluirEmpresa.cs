using MediatR;
using padrao.API.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.ExcluirEmpresa
{
    public class ParametroExcluirEmpresa : IRequest<ResultadoControllerDTO>
    {
        public ParametroExcluirEmpresa(Models.Empresas empresa)
        {
            Empresa = empresa;
        }
        public Models.Empresas Empresa { get; set; }
    }
}
