using MediatR;
using padrao.API.Handlers.Comandos.Onibus.CadastrarOnibus;
using padrao.API.Models.DTOs.Onibus;

namespace padrao.API.Handlers.Comandos.Onibus.AtualizarOnibus
{
    public class ParametroAtualizarOnibus : IRequest<ResultadoCadastrarOnibus>
    {
        public ParametroAtualizarOnibus(int empresaId, OnibusDTO onibus)
        {
            EmpresaId = empresaId;
            Onibus = onibus;
        }
        public int EmpresaId { get; set; }
        public OnibusDTO Onibus { get; set; }
    }
}
