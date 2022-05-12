using MediatR;
using padrao.API.Models.DTOs.Onibus;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus
{
    public class ParametroCadastrarOnibus : IRequest<ResultadoCadastrarOnibus>
    {
        public ParametroCadastrarOnibus(int empresaId, OnibusDTO onibus)
        {
            EmpresaId = empresaId;
            Onibus = onibus;
        }
        public int EmpresaId { get; set; }
        public OnibusDTO Onibus { get; set; }
    }
}
