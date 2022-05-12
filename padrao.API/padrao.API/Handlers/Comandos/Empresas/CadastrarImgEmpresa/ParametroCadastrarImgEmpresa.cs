using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Empresas.CadastrarImgEmpresa
{
    public class ParametroCadastrarImgEmpresa : IRequest<ResultadoCadastrarImgEmpresa>
    {
        public ParametroCadastrarImgEmpresa(int empresaId, IFormFile arquivo)
        {
            EmpresaId = empresaId;
            Arquivo = arquivo;
        }
        public int EmpresaId { get; set; }
        public IFormFile Arquivo { get; set; }
    }
}
