using AutoMapper;
using MediatR;
using padrao.API.Data;
using padrao.API.Helpers;
using padrao.API.Models.DTOs.Contrato;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace padrao.API.Handlers.Comandos.Contratos.CadastrarContrato
{
    public class ComandoCadastrarContrato : IRequestHandler<ParametroCadastrarContrato, ResultadoCadastrarContrato>
    {
        private readonly BancoDBContext _bancoDBContext;
        private readonly IMapper _mapper;

        public ComandoCadastrarContrato(BancoDBContext bancoDBContext, IMapper mapper)
        {
            _bancoDBContext = bancoDBContext;
            _mapper = mapper;
        }

        public async Task<ResultadoCadastrarContrato> Handle(ParametroCadastrarContrato request, CancellationToken cancellationToken)
        {
            try
            {
                var contratoDTO = new ContratoDTO
                {
                    Codigo = GerarCodigoHelper.GerarCodigo(),
                    EmpresaId = request.EmpresaId,
                    Contrato = request.Contrato,
                };
                var contrato = _mapper.Map<Models.ContratoViagem>(contratoDTO);
                await _bancoDBContext.AddAsync(contrato);
                await _bancoDBContext.SaveChangesAsync(cancellationToken);

                return new ResultadoCadastrarContrato
                {
                    Contrato = _mapper.Map<ContratoDTO>(contrato),
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
