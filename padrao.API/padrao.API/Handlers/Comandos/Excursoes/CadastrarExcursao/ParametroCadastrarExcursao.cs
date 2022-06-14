using MediatR;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.CadastrarExcursao
{
    public class ParametroCadastrarExcursao : IRequest<ResultadoCadastrarExcursao>
    {
        public ParametroCadastrarExcursao(int empresaId, int usuarioId, ExcursaoDTO excursao)
        {
            EmpresaId = empresaId;
            UsuarioId = usuarioId;
            Excursao = excursao;
        }
        public int EmpresaId { get; set; }
        public int UsuarioId { get; set; }
        public ExcursaoDTO Excursao { get; set; }
    }
}
