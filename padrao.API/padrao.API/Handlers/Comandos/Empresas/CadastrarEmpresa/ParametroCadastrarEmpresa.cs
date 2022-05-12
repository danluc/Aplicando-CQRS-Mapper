using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarEmpresa
{
    public class ParametroCadastrarEmpresa : IRequest<ResultadoCadastrarEmpresa>
    {
        public ParametroCadastrarEmpresa(Models.Empresas dados, bool empresaDoSistema = false)
        {
            Dados = dados;
            EmpresaDoSistema = empresaDoSistema;
        }

        public Models.Empresas Dados { get; set; }
        public bool EmpresaDoSistema { get; set; }
    }
}
