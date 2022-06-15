using MediatR;
using padrao.API.Models.DTOs.Excursoes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Excursoes.AtualizarExcursao
{
    public class ParametroAtualizarExcursao : IRequest<ResultadoAtualizarExcursao>
    {
        public ParametroAtualizarExcursao(int empresaId, int usuarioId, ExcursaoDTO excursao)
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
