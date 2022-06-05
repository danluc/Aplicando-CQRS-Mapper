using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Consultas.Motoristas.ListarMotoristasPorEmpresa
{
    public class ParametroListarMotoristasPorEmpresa : IRequest<ResultadoListarMotoristasPorEmpresa>
    {
        public ParametroListarMotoristasPorEmpresa(int empresaId, int skip, int take, string nomeCpf)
        {
            EmpresaId = empresaId;
            NomeCpf = nomeCpf;
            Skip = skip;
            Take = take;
        }
        public int EmpresaId { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public string NomeCpf { get; set; }
    }
}
