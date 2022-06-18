using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using padrao.API.Data;
using padrao.API.Handlers.Comandos.Contratos.CadastrarContrato;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Contratos.AtualizarContrato
{
    public class ComandoAtualizarContrato : IRequestHandler<ParametrosAtualizarContrato, ResultadoCadastrarContrato>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoAtualizarContrato(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarContrato> Handle(ParametrosAtualizarContrato request, CancellationToken cancellationToken)
        {
            try
            {
                var hasDados = await _bancoDBContext.ContratoViagem.FirstOrDefaultAsync(e => e.EmpresaId == request.EmpresaId && e.Codigo == request.Contrato.Codigo);
                if(hasDados == null)
                {
                    return new ResultadoCadastrarContrato
                    {
                        Mensagem = "Contrato não encontrado!",
                        Sucesso = false
                    };
                }

                hasDados.Contrato = request.Contrato.Contrato;
                hasDados.DataAlteracao = DateTime.Now;

                _bancoDBContext.Update(hasDados);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarContrato
                {
                    Contrato = _mapper.Map<ContratoDTO>(hasDados),
                    Sucesso = true,
                };
            }
            catch (Exception ex)
            {
                return new ResultadoCadastrarContrato
                {
                    Mensagem = ex.Message,
                    Sucesso = false
                };
            }
        }
    }
}
