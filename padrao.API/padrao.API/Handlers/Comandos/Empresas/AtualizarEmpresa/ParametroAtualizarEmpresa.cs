using MediatR;
using padrao.API.Models.DTOs.Emnpresas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.AtualizarEmpresa
{
    public class ParametroAtualizarEmpresa : IRequest<ResultadoAtualizarEmpresa>
    {
        public ParametroAtualizarEmpresa(EmpresaDTO dados, int empresaId)
        {
            Dados = dados;
            EmpresaId = empresaId;
        }

        public EmpresaDTO Dados { get; set; }
        public int EmpresaId { get; set; }
    }
}
