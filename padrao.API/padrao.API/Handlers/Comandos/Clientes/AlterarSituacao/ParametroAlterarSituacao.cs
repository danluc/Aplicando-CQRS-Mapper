using MediatR;
using padrao.API.Handlers.Comandos.Clientes.CadastrarCliente;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Clientes.AlterarSituacao
{
    public class ParametroAlterarSituacao : IRequest<ResultadoCadastrarCliente>
    {
        public ParametroAlterarSituacao(int empresaId, string codigoCliente)
        {
            EmpresaId = empresaId;
            Codigo = codigoCliente;
        }

        public int EmpresaId { get; set; }
        public string Codigo { get; set; }
    }
}
